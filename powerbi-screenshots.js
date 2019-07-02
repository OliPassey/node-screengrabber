const LOGIN = require('./config/login');
const puppeteer = require('puppeteer');

if (LOGIN.DASHBOARD_USER === '' || LOGIN.DASHBOARD_PASSWORD === '') {
  console.warn('You must setup your credentials inside config/login.js');
  process.exit(1);
}

const sleep = ms => new Promise((resolve) => { setTimeout(resolve, ms); });

(async () => {
  console.log('Launching Chromium');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const screenshotFull = fileName => page.screenshot({
    path: `./images/${fileName}.png`,
  });
  const screenshotClip = fileName => page.screenshot({
    path: `./images/${fileName}.png`,
    clip: {
      x: 220,
      y: 100,
      width: 1820,
      height: 1080,
    },
  });

  console.log('Chromium launched, logging into site');
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://app.powerbi.com/?noSignUpCheck=1', { waitUntil: 'networkidle0', timeout: 60000 });

  console.log('MS login screen, sending email');
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', LOGIN.DASHBOARD_USER);
  await page.click('input[type="submit"]');

  console.log('Getting into corporate signup page, sending password');
  await page.waitForSelector('#loginArea');
  await page.type('input[type="password"]', LOGIN.DASHBOARD_PASSWORD);
  await page.click('#submitButton');
  await page.waitForSelector('#idSIButton9');
  await page.click('#idSIButton9');

  console.log('Sleeping for 15s...');
  await sleep(15000);

  // It's an SPA in javascript, waiting for the idle network might raise false positives
  // so we manually wait at each page.

  // Report 1
  await page.goto('FULL-POWERBI-URL-TO-DASHBOARD-OR-REPORT');
  await sleep(10000);
  await screenshotFull('report-1'); // Fullscreen example

  // Report 2
  await page.goto('FULL-POWERBI-URL-TO-DASHBOARD-OR-REPORT');
  await sleep(10000);
  await screenshotClip('report-2'); // Clipped example (needs a bit of tweaking)

  // ... etc


  browser.close();
  process.exit(0); // Reports to parent process that we're all ok.
})();
