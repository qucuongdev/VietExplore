import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://unsplash.com/s/photos/hanoi', { waitUntil: 'networkidle' });
  
  const info = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(i => ({
      src: i.src.slice(0, 80),
      alt: i.alt.slice(0, 80)
    })).filter(i => i.src.includes('images.unsplash.com'));
  });

  console.log('Found Unsplash images count:', info.length);
  console.log('Sample images:', JSON.stringify(info.slice(0, 10), null, 2));

  await browser.close();
})();
