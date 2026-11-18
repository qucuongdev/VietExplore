import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/vi/destinations/ho-guom-pho-co', { waitUntil: 'networkidle' });
  
  await page.addStyleTag({
    url: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap'
  });

  // Wait for font to load
  await page.evaluate(() => document.fonts.ready);

  const h4 = page.locator('h4', { hasText: 'Tô phở bò' }).first();
  
  // Test with Lora
  await h4.evaluate(el => { el.style.fontFamily = 'Lora, serif'; });
  await h4.screenshot({ path: 'scripts/h4-lora.png' });
  console.log('Saved scripts/h4-lora.png');

  // Test with Playfair Display
  await h4.evaluate(el => { el.style.fontFamily = "'Playfair Display', serif"; });
  await h4.screenshot({ path: 'scripts/h4-playfair.png' });
  console.log('Saved scripts/h4-playfair.png');

  await browser.close();
})();
