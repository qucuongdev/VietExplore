import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  console.log('Navigating to http://localhost:3000/vi/destinations/ho-guom-pho-co...');
  const res = await page.goto('http://localhost:3000/vi/destinations/ho-guom-pho-co', { waitUntil: 'networkidle' });
  console.log('Status:', res.status());

  await page.evaluate(() => document.fonts.ready);

  // Inspect H4 font
  const h4 = page.locator('h4', { hasText: 'Tô phở bò' }).first();
  const h4Info = await h4.evaluate(el => {
    const cs = window.getComputedStyle(el);
    return {
      text: el.innerText,
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight
    };
  });
  console.log('H4 Info:', JSON.stringify(h4Info, null, 2));

  // Take screenshot of H4
  await h4.screenshot({ path: 'scripts/h4-after-fix.png' });
  console.log('Saved scripts/h4-after-fix.png');

  // Inspect Thumbnail
  const thumbButton = page.locator('button[aria-label="Xem ảnh 1"]').first();
  const thumbImg = thumbButton.locator('img');
  const imgInfo = await thumbImg.evaluate(img => ({
    src: img.src,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    clientWidth: img.clientWidth,
    clientHeight: img.clientHeight
  }));
  console.log('Thumbnail Img Info:', JSON.stringify(imgInfo, null, 2));

  // Take screenshot of thumbnails strip
  const thumbsContainer = page.locator('div.flex.items-center.gap-3.p-3').first();
  await thumbsContainer.screenshot({ path: 'scripts/gallery-thumbs-after.png' });
  console.log('Saved scripts/gallery-thumbs-after.png');

  await browser.close();
})();
