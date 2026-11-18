import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.goto('http://localhost:3000/vi/destinations/ho-guom-pho-co', { waitUntil: 'networkidle' });

  // Check initial counter badge
  const badge = page.locator('text=1 / 4').first();
  console.log('Badge initial exists:', await badge.isVisible());

  const mainImg = page.locator('div.relative.aspect-16\\/9.md\\:aspect-21\\/9 img').first();
  const src1 = await mainImg.getAttribute('src');
  console.log('Main image 1:', src1);

  // Click thumbnail 2
  const thumb2 = page.locator('button[aria-label="Xem ảnh 2"]').first();
  await thumb2.click();
  await page.waitForTimeout(500);

  const badge2 = page.locator('text=2 / 4').first();
  console.log('Badge updated to 2 / 4:', await badge2.isVisible());

  const src2 = await mainImg.getAttribute('src');
  console.log('Main image 2:', src2);
  console.log('Images are different:', src1 !== src2);

  // Take screenshot of gallery after clicking thumb 2
  await page.locator('.w-full.bg-white.rounded-3xl').screenshot({ path: 'scripts/gallery-thumb-clicked.png' });
  console.log('Saved scripts/gallery-thumb-clicked.png');

  await browser.close();
})();
