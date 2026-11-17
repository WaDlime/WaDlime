// Capture chaque écran HTML en PNG 1920x1080 (polices chargées avant la capture).
// Usage : node render_slides.js jobs.json   (jobs = [{ "html": "...", "png": "..." }])
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  for (const job of jobs) {
    await page.setContent(fs.readFileSync(job.html, 'utf8'), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: job.png });
  }
  await browser.close();
})();
