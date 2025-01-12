const { describe, it, afterEach } = require('mocha');
const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

describe('timeouts', function() {
    this.timeout(0); // Set the timeout for the test suite

    let driver;

    it('implicit wait', async function() {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.manage().setTimeouts({ implicit: 10000 }); // Set implicit wait
        await driver.get("https://www.amazon.com");
    });

    afterEach(async () => {
        await driver.quit();
    });
});

