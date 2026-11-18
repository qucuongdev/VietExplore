import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/vi/destinations/ho-guom-pho-co', { waitUntil: 'networkidle' });
  
  // Find the H4 with 'Tô phở bò'
  const h4 = page.locator('h4', { hasText: 'Tô phở bò' }).first();
  await h4.screenshot({ path: 'scripts/h4-before.png' });
  console.log('Saved scripts/h4-before.png');

  // Find thumbnail container
  const thumbs = page.locator('button[aria-label="Xem ảnh 1"]').first();
  await thumbs.screenshot({ path: 'scripts/thumb-before.png' });
  console.log('Saved scripts/thumb-before.png');

  await browser.close();
})();
