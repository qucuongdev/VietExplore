import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  const testUrls = [
    'cau-long-bien',
    'van-mieu-quoc-tu-giam',
    'nha-tho-lon-ha-noi',
    'ho-tay-chua-tran-quoc'
  ];

  for (const slug of testUrls) {
    const url = `http://localhost:3000/vi/destinations/${slug}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const thumbs = await page.$$eval('div.flex.items-center.gap-3.p-3 button img', imgs =>
      imgs.map(i => ({ alt: i.alt, naturalWidth: i.naturalWidth }))
    );
    console.log(`\n=== ${slug} (thumbs: ${thumbs.length}) ===`);
    thumbs.forEach(t => console.log(`  - [w=${t.naturalWidth}] ${t.alt}`));
  }

  await browser.close();
})();
