'use strict';

const puppeteer = require('puppeteer');

const fullscreen = true;

(async() => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 3,
  });
  const page = await browser.newPage();

  await page.goto('https://en.wikipedia.org/wiki/Mozilla');
  await page.waitFor(5);

  if (fullscreen) {
    await page.screenshot({path: 'screenshot.png', fullPage: true});
  } else {
    await page.screenshot({path: 'screenshot.png', clip: {
      x: 20,
      y: 20,
      width: 300,
      height: 1000,
      scale: 1,  // puppeteer always resets it to 1
    }});
  }

  await browser.close();
})();
