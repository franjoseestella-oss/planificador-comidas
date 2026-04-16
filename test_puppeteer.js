const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.static('.'));
const server = app.listen(8080, async () => {
  console.log('Server started');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));
  await page.goto('http://localhost:8080/');
  await new Promise(r => setTimeout(r, 2000));
  
  // click menu compra to show state
  try {
    await page.click('#nav-compra');
  } catch(e) {}
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Try to click an item
  try {
    await page.click('.shopping-item');
    console.log("Clicked shopping item!");
  } catch(e) {}

  await browser.close();
  server.close();
  process.exit(0);
});
