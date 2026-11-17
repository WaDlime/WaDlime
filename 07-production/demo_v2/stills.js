// Captures PNG de quelques instants (pour vérifier ou pour les « photos » modèles).
// Usage : node stills.js scene.html sortie_prefixe t1 t2 ...
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [html, prefix, ...times] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(html), { waitUntil: 'networkidle' });
  await page.evaluate(() => window.prepare());
  for (const t of times) {
    await page.evaluate((x) => window.renderAt(x), Number(t));
    await page.screenshot({ path: `${prefix}_${t}.png` });
  }
  await browser.close();
})();
