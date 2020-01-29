'use strict';

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const delay = 5000;

(async() => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('http://whatsmyuseragent.org/');
  await page.waitFor(delay);

  await page.emulate(devices['iPhone 6']);
  await page.waitFor(delay);

  // Change viewport without modifying the user agent
  await page.setViewport({
    width: 500,
    height: 500,
    mobile: false,
    devicePixelRatio: 2
  });
  await page.waitFor(delay);

  await page.emulate(devices['Pixel 2 XL landscape']);
  await page.waitFor(delay);

  await browser.close();
})();
