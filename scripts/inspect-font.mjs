import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/vi/destinations/ho-guom-pho-co', { waitUntil: 'networkidle' });
  
  const h4s = await page.$$eval('h4', els => els.map(e => ({
    text: e.innerText,
    fontFamily: window.getComputedStyle(e).fontFamily,
    fontWeight: window.getComputedStyle(e).fontWeight,
  })));
  console.log('H4s count:', h4s.length);
  console.log('H4 list:', JSON.stringify(h4s, null, 2));

  // Also check if any text on page contains 'phố'
  const phoText = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const results = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.includes('Tô phở bò')) {
        results.push({
          text: node.nodeValue,
          parentTag: node.parentElement.tagName,
          font: window.getComputedStyle(node.parentElement).fontFamily,
        });
      }
    }
    return results;
  });
  console.log('PhoText:', JSON.stringify(phoText, null, 2));

  await browser.close();
})();
