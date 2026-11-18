import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  console.log('Visiting http://localhost:3000/vi/destinations/ho-guom-pho-co...');
  await page.goto('http://localhost:3000/vi/destinations/ho-guom-pho-co', { waitUntil: 'networkidle' });

  // Extract all gallery thumbnails
  const thumbs = await page.$$eval('div.flex.items-center.gap-3.p-3 button', buttons => {
    return buttons.map(b => {
      const img = b.querySelector('img');
      return {
        label: b.getAttribute('aria-label'),
        imgSrc: img ? img.src : null,
        imgAlt: img ? img.alt : null
      };
    });
  });

  console.log('Gallery thumbnails:', JSON.stringify(thumbs, null, 2));

  // Take screenshot of gallery thumbnails container
  const galleryElem = page.locator('div.flex.items-center.gap-3.p-3').first();
  await galleryElem.screenshot({ path: 'scripts/hanoi-gallery-fixed.png' });
  console.log('Saved scripts/hanoi-gallery-fixed.png');

  // Also check main image caption/alt
  const mainImg = page.locator('div.relative.aspect-16\\/9.md\\:aspect-21\\/9 img').first();
  console.log('Main image src:', await mainImg.getAttribute('src'));
  console.log('Main image alt:', await mainImg.getAttribute('alt'));

  await browser.close();
})();
