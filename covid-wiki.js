const fs = require('fs');
const puppeteer = require('puppeteer');

function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day =`${date.getDate()}`.padStart(2, '0');
    return `${year}${month}${day}`
}

console.log("Running Screengrabber, always tip your waitress");
	(async () => {
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({width: 1920, height: 40080});
await page.goto('https://en.wikipedia.org/wiki/COVID-19_pandemic', {waitUntil: 'networkidle0', timeout: 60000});
await page.screenshot({path: `home/oli/covid-tracker/covid-wiki-${getDateString()}.png`});
await browser.close();
console.log("Jobs a goodun! Im off to the pub...");
})();
