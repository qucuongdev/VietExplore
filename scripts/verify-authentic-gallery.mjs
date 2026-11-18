import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  console.log('Visiting http://localhost:3000/vi/destinations/ho-guom-pho-co...');
  const res = await page.goto('http://localhost:3000/vi/destinations/ho-guom-pho-co', { waitUntil: 'networkidle' });
  console.log('Status:', res.status());

  // Wait for images to load
  await page.waitForTimeout(1500);

  // Extract all 4 thumbnails
  const thumbs = await page.$$eval('div.flex.items-center.gap-3.p-3 button', buttons => {
    return buttons.map(b => {
      const img = b.querySelector('img');
      return {
        label: b.getAttribute('aria-label'),
        imgSrc: img ? img.src : null,
        imgAlt: img ? img.alt : null,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
      };
    });
  });

  console.log('Gallery thumbnails (' + thumbs.length + '):');
  console.log(JSON.stringify(thumbs, null, 2));

  // Take screenshot of gallery thumbnails container
  const galleryElem = page.locator('div.flex.items-center.gap-3.p-3').first();
  await galleryElem.screenshot({ path: 'scripts/hanoi-gallery-authentic.png' });
  console.log('Saved scripts/hanoi-gallery-authentic.png');

  await browser.close();
})();
