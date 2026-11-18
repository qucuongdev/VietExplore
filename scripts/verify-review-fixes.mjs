import assert from 'node:assert/strict';
import { chromium } from 'playwright';

// Run against a production server: pnpm exec node scripts/verify-review-fixes.mjs
const baseUrl = process.env.REVIEW_BASE_URL || 'http://localhost:3100';
const browser = await chromium.launch();

try {
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  for (const locale of ['vi', 'en']) {
    for (const path of ['/provinces', '/destinations', '/explore', '/provinces/ha-noi', '/destinations/vinh-ha-long']) {
      const response = await page.goto(`${baseUrl}/${locale}${path}`, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200);
      await page.locator('link[rel="canonical"]').waitFor({ state: 'attached' });
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://vietexplore.vercel.app/${locale}${path}`);
      for (const alternative of ['vi', 'en']) {
        assert.equal(
          await page.locator(`link[rel="alternate"][hreflang="${alternative}"]`).getAttribute('href'),
          `https://vietexplore.vercel.app/${alternative}${path}`,
        );
      }
    }
  }
  console.log('PASS: Canonical and language alternatives for all page types in both locales.');

  const response = await page.goto(`${baseUrl}/en/destinations?q=da+lat&q=hanoi&category=all&category=heritage&province=all&province=p-ha-noi`, { waitUntil: 'domcontentloaded' });
  assert.equal(response.status(), 200);
  const input = page.getByRole('textbox');
  await input.waitFor();
  assert.equal(await input.inputValue(), 'da lat');
  assert.equal(await page.getByRole('combobox').inputValue(), 'all');
  assert.equal(await page.locator('h3').filter({ hasText: 'Xuan Huong' }).count(), 1);
  console.log('PASS: Repeated query, category, and province parameters.');

  await input.fill('ha ');
  await page.waitForFunction(() => document.querySelector('input[type="text"]').value === 'ha ');
  assert.equal(await input.inputValue(), 'ha ');
  await input.pressSequentially('noi');
  await page.waitForFunction(() => document.querySelector('input[type="text"]').value === 'ha noi');
  assert.equal(await input.inputValue(), 'ha noi');
  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('input[type="text"]').value === '');
  assert.equal(await input.inputValue(), '');

  const beaches = page.getByRole('button', { name: 'Coastal & Islands', exact: true });
  const heritage = page.getByRole('button', { name: 'Heritage & Culture', exact: true });
  await beaches.click();
  await page.evaluate(() => window.history.pushState(null, '', '?category=heritage'));
  await page.waitForFunction(() => new URLSearchParams(location.search).get('category') === 'heritage');
  await page.waitForFunction(() => [...document.querySelectorAll('button')].some((button) => button.textContent === 'Heritage & Culture' && button.className.includes('bg-[#194D42]')));
  await page.goBack({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => [...document.querySelectorAll('button')].some((button) => button.textContent === 'Coastal & Islands' && button.className.includes('bg-[#194D42]')));
  assert.match(await beaches.getAttribute('class'), /bg-\[#194D42\]/);
  await page.goForward({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => [...document.querySelectorAll('button')].some((button) => button.textContent === 'Heritage & Culture' && button.className.includes('bg-[#194D42]')));
  assert.match(await heritage.getAttribute('class'), /bg-\[#194D42\]/);

  await page.getByRole('button', { name: 'Switch to English' }).isVisible();
  await page.getByRole('button', { name: /Chuy/ }).first().click();
  await page.waitForURL('**/vi/destinations?category=heritage');
  assert.equal(new URL(page.url()).searchParams.get('category'), 'heritage');
  console.log('PASS: Spaces while typing, reset, browser Back/Forward, and language switching.');

  await page.goto(`${baseUrl}/en/destinations/thac-datanla`, { waitUntil: 'domcontentloaded' });
  const opener = page.getByRole('button', { name: /View full/ });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await dialog.waitFor();
  assert.equal(await dialog.locator('img').first().evaluate((img) => getComputedStyle(img).objectFit), 'contain');
  assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog')), true);
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog')), true);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog')), true);

  const firstSrc = await dialog.locator('img').first().getAttribute('src');
  await page.keyboard.press('ArrowRight');
  assert.notEqual(await dialog.locator('img').first().getAttribute('src'), firstSrc);
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'detached' });
  assert.equal(await opener.evaluate((element) => element === document.activeElement), true);
  assert.equal(await page.evaluate(() => document.body.style.overflow), '');

  await page.setViewportSize({ width: 390, height: 844 });
  await opener.click();
  await dialog.waitFor();
  const bounds = await dialog.boundingBox();
  assert.equal(Math.round(bounds.width), 390);
  assert.equal(Math.round(bounds.height), 844);
  const imageBounds = await dialog.locator('img').first().boundingBox();
  assert.ok(imageBounds.height > 100, 'The mobile lightbox image must have visible height.');
  await dialog.getByRole('button', { name: 'Close (Esc key)' }).click();
  await dialog.waitFor({ state: 'detached' });
  console.log('PASS: Uncropped lightbox, native focus containment, arrows, Escape, focus restoration, and mobile sizing.');
  assert.deepEqual(pageErrors, []);
} finally {
  await browser.close();
}
