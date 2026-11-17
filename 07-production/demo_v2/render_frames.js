// Rend scene.html image par image (renderAt(t)) en JPEG 1920x1080.
// Usage : node render_frames.js scene.html dossier_images fps durée [t_debut]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [html, outdir, fps, dur, tstart] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(html), { waitUntil: 'networkidle' });
  await page.evaluate(() => window.prepare());
  const F = Number(fps), N = Math.round(Number(dur) * F), T0 = Number(tstart || 0);
  for (let i = 0; i < N; i++) {
    const t = T0 + i / F;
    await page.evaluate((x) => window.renderAt(x), t);
    await page.screenshot({ path: path.join(outdir, `f_${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 93 });
  }
  await browser.close();
})();
