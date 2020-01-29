'use strict';

const puppeteer = require('puppeteer');

const firefoxOptions = {
  product: 'firefox',
  extraPrefsFirefox: {
    'browser.uidensity': 2,
  },
  headless: false,
  slowMo: 90,
};

(async() => {
  const browser = await puppeteer.launch(firefoxOptions);
  const page = await browser.newPage();

  await page.goto('https://bugzilla.mozilla.org/query.cgi');

  // Navigate to instant search
  await Promise.all([
    page.waitForNavigation(),
    page.click('#tab_instant'),
  ]);

  // Enter query
  await page.focus('#content');
  await page.keyboard.type('Hello World!');

  // Select, delete word
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.down('Shift');
  for (let i = 0; i < ' World'.length; i++)
    await page.keyboard.press('ArrowLeft');
  await page.keyboard.up('Shift');
  await page.keyboard.press('Backspace');

  await browser.close();
})();
