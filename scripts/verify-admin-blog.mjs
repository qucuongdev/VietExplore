import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { startSupabaseService } from '../tests/fixtures/supabase-service.mjs';

const service = await startSupabaseService();
const testEnv = { ...process.env, NEXT_PUBLIC_SUPABASE_URL: service.url, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: service.key };
const baseUrl = 'http://localhost:3101';
let application;
let browser;

function build(env) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'build'], { env, windowsHide: true });
    let output = '';
    child.stdout.on('data', (data) => { output += data; });
    child.stderr.on('data', (data) => { output += data; });
    child.on('error', reject);
    child.on('exit', (code) => code === 0 ? resolve() : reject(new Error(output)));
  });
}

try {
  await build(testEnv);
  application = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3101'], { env: testEnv, windowsHide: true });
  let serverOutput = '';
  application.stdout.on('data', (data) => { serverOutput += data; });
  application.stderr.on('data', (data) => { serverOutput += data; });
  await new Promise((resolve, reject) => {
    const deadline = Date.now() + 15000;
    const check = async () => {
      try { if ((await fetch(`${baseUrl}/en/login`)).ok) return resolve(); } catch { /* Wait until ready. */ }
      if (Date.now() > deadline) return reject(new Error(serverOutput));
      setTimeout(check, 200);
    };
    void check();
  });
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const login = async (email) => {
    await page.goto(`${baseUrl}/en/login`, { waitUntil: 'domcontentloaded' });
    await page.getByLabel('Email address').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(service.password);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  };

  await page.goto(`${baseUrl}/en/admin/posts/new`, { waitUntil: 'domcontentloaded' });
  assert.match(page.url(), /\/en\/login$/);
  await login('reader@example.test');
  await page.waitForURL(`${baseUrl}/en`);
  await page.goto(`${baseUrl}/en/admin/posts`, { waitUntil: 'domcontentloaded' });
  assert.match(page.url(), /error=forbidden/);
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.waitForURL('**/en/login');
  console.log('PASS: Anonymous and reader access are denied; forged metadata does not grant admin access.');

  await login('admin@example.test');
  await page.waitForURL('**/en/admin/posts');
  await page.getByRole('link', { name: 'Write a story', exact: true }).last().click();
  await page.waitForURL('**/en/admin/posts/new');
  await page.getByLabel('Story title', { exact: true }).fill('Browser regression story');
  await page.getByRole('button', { name: 'Paragraph', exact: true }).click();
  await page.getByRole('article', { name: 'Block 1: Paragraph' }).getByRole('textbox').fill('A thoughtful journey through Hanoi.');
  await page.getByRole('button', { name: 'Heading', exact: true }).click();
  const heading = page.getByRole('article', { name: 'Block 2: Heading' });
  await heading.getByRole('textbox').fill('A lakeside morning');
  await heading.getByRole('slider').fill('6');
  await heading.getByRole('button', { name: 'Move up' }).click();
  await page.getByRole('article', { name: 'Block 2: Paragraph' }).getByRole('button', { name: 'Drag to reorder' }).dragTo(page.getByRole('article', { name: 'Block 1: Heading' }));
  await page.getByRole('article', { name: 'Block 1: Paragraph' }).waitFor();
  await page.getByRole('article', { name: 'Block 2: Heading' }).getByRole('button', { name: 'Move up' }).click();
  await page.getByRole('button', { name: 'Save draft', exact: true }).click();
  await page.waitForURL('**/edit?saved=1');
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert.equal(await page.getByLabel('Story title', { exact: true }).inputValue(), 'Browser regression story');
  assert.equal(await page.getByRole('article', { name: 'Block 1: Heading' }).getByRole('slider').inputValue(), '6');
  assert.equal(service.posts[0].status, 'draft');
  const publicUrl = `${baseUrl}/en/blog/browser-regression-story`;
  assert.equal((await fetch(publicUrl)).status, 404);
  console.log('PASS: Admin login, new draft, block reorder/resize, persistence after reload, and private draft URL.');

  await page.getByRole('button', { name: 'Image', exact: true }).click();
  const image = page.getByRole('article', { name: 'Block 3: Image' });
  await image.getByLabel('Upload image', { exact: true }).setInputFiles({ name: 'test.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jWQAAAABJRU5ErkJggg==', 'base64') });
  await image.getByRole('status').filter({ hasText: 'Image uploaded.' }).waitFor();
  await image.getByLabel('Image description', { exact: true }).fill('A test photograph');
  await page.getByRole('button', { name: 'Preview', exact: true }).click();
  await page.getByRole('heading', { name: 'A lakeside morning' }).waitFor();
  await page.getByRole('button', { name: 'Publish story', exact: true }).click();
  await page.getByRole('button', { name: 'Move to drafts', exact: true }).waitFor();
  const publishedResponse = await fetch(publicUrl);
  assert.equal(publishedResponse.status, 200);
  assert.equal(publishedResponse.headers.get('link')?.includes('/vi/blog/browser-regression-story') ?? false, false);
  const persisted = service.posts[0];
  assert.equal(persisted.status, 'published');
  assert.equal(persisted.content[0].width, 6);
  console.log('PASS: Image upload, shared preview renderer, publish and public reading.');

  await mkdir('artifacts/admin-blog', { recursive: true });
  await page.screenshot({ path: 'artifacts/admin-blog/editor-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await page.screenshot({ path: 'artifacts/admin-blog/editor-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Move to drafts', exact: true }).click();
  await page.getByRole('button', { name: 'Publish story', exact: true }).waitFor();
  assert.equal((await fetch(publicUrl)).status, 404);
  await page.getByRole('link', { name: 'Back to stories' }).click();
  await page.getByRole('button', { name: 'Delete post: Browser regression story' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Delete post', exact: true }).click();
  await page.waitForURL('**/en/admin/posts?deleted=1');
  assert.equal(service.posts.length, 0);
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.waitForURL('**/en/login');
  await page.goto(`${baseUrl}/en/admin/posts`, { waitUntil: 'domcontentloaded' });
  assert.match(page.url(), /\/en\/login$/);
  assert.deepEqual(errors, []);
  console.log('PASS: Mobile layout, unpublish, confirmed delete, logout and subsequent access denial.');
} finally {
  await browser?.close();
  if (application) {
    const exited = new Promise((resolve) => application.once('exit', resolve));
    application.kill();
    await exited;
  }
  await service.close();
  // Remove the test provider from generated bundles; real env configuration is restored.
  await build(process.env);
}
