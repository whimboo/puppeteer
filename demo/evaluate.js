'use strict';

const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://news.ycombinator.com/');

  // Extract articles from the page.
  const resultsSelector = '.storylink';
  const links = await page.evaluate(resultsSelector => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map(anchor => {
      const title = anchor.textContent.trim();
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);
  console.log(links.join('\n'));

  await browser.close();
})();
