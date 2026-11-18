import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const failedRequests = [];
  const consoleErrors = [];

  page.on('response', (response) => {
    if (response.status() >= 400) {
      failedRequests.push({ url: response.url(), status: response.status() });
    }
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const testRoutes = [
    'http://localhost:3000/vi',
    'http://localhost:3000/vi/provinces',
    'http://localhost:3000/vi/destinations',
    'http://localhost:3000/vi/destinations/ho-guom-pho-co',
    'http://localhost:3000/vi/destinations/cau-long-bien',
    'http://localhost:3000/vi/destinations/ho-tay-chua-tran-quoc',
    'http://localhost:3000/vi/destinations/vuon-quoc-gia-ba-vi',
  ];

  for (const url of testRoutes) {
    console.log(`\n========================================\nChecking: ${url}\n========================================`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      
      // Auto-scroll through entire page to trigger Next.js lazy-loaded images
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 400;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      });

      // Wait a moment for any lazy images triggered by scroll to finish loading
      await page.waitForTimeout(2000);

    } catch (err) {
      console.log(`Navigation timeout or error on ${url}:`, err.message);
    }

    const imageStats = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const fallbacks = Array.from(document.querySelectorAll('[role="img"][aria-label]'));

      const brokenImgs = imgs
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => ({ src: img.src.substring(0, 100), alt: img.alt }));

      const loadedImgs = imgs
        .filter((img) => img.complete && img.naturalWidth > 0)
        .map((img) => ({
          src: img.src.substring(0, 80),
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        }));

      const fallbackLabels = fallbacks.map((f) => f.getAttribute('aria-label'));

      return {
        totalImgsInDOM: imgs.length,
        loadedCount: loadedImgs.length,
        brokenCount: brokenImgs.length,
        brokenImgs,
        fallbackCount: fallbacks.length,
        fallbackLabels,
      };
    });

    console.log(`Total <img> tags: ${imageStats.totalImgsInDOM}`);
    console.log(`Successfully loaded: ${imageStats.loadedCount}`);
    console.log(`Broken (naturalWidth == 0): ${imageStats.brokenCount}`);
    if (imageStats.brokenCount > 0) {
      console.log('Broken images:', imageStats.brokenImgs);
    }
    console.log(`Fallback placeholders rendered: ${imageStats.fallbackCount}`);
    if (imageStats.fallbackCount > 0) {
      console.log('Fallback labels:', imageStats.fallbackLabels);
    }
  }

  console.log('\n========================================\nFailed HTTP Requests (4xx / 5xx):\n========================================');
  console.log(JSON.stringify(failedRequests, null, 2));

  console.log('\n========================================\nBrowser Console Errors:\n========================================');
  console.log(JSON.stringify(consoleErrors, null, 2));

  await browser.close();
}

main().catch(console.error);
