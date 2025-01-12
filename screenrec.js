const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

(async function takeScreenshot() {
  // Create a new instance of the Chrome driver
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    // Navigate to the desired URL
    await driver.get('https://www.amazon.com');

    // Take a screenshot
    let screenshot = await driver.takeScreenshot();

    // Save the screenshot to a file
    let filePath = path.join(__dirname, 'screenshot.png');
    fs.writeFileSync(filePath, Buffer.from(screenshot, 'base64'));
    console.log('Screenshot saved to:', filePath);

  } 
  finally {
    // Quit the driver
    await driver.quit();
  }
})();
