'use strict';

const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/72');
  await page.pdf({ path: 'mdn.pdf', printBackground: true });
  await browser.close();
})();
