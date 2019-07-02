const puppeteer = require('puppeteer');
console.log("Running Screengrabber, always tip your waitress");
	(async () => {
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({width: 1920, height: 1080});
await page.goto('https://olipassey.me.uk/', {waitUntil: 'networkidle0', timeout: 60000});
await page.screenshot({path: 'C:/node-screengrabber/images/olipassey.png'});
await browser.close();
console.log("Jobs a goodun! Im off to the pub...");
})();