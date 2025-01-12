const { Builder, By, until, Browser } = require('selenium-webdriver');

(async function runTest() {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    try {
        // Start interacting with the web application
        await driver.get('https://rms-user-three.vercel.app/');
        await driver.findElement(By.id(":r0:")).sendKeys("rasiadmin01@gmail.com");
        await driver.findElement(By.id(":r1:")).sendKeys("rasi@782");
        await driver.findElement(By.id(":r2:")).click();
        await driver.sleep(1000);

        // Wait for and click the menu
        const menuLocator = By.xpath("//a[contains(text(), 'Menu')]");
        await driver.wait(until.elementLocated(menuLocator), 5000);
        const menuElement = await driver.findElement(menuLocator);
        await driver.wait(until.elementIsVisible(menuElement), 5000);
        await driver.wait(async function() {
            return (await menuElement.isDisplayed()) && (await menuElement.isEnabled());
        }, 5000);
        await menuElement.click();

        // Add a new menu item
        const addMenuLocator = By.xpath("//button[contains(text(), 'Add Menu')]");
        await driver.wait(until.elementLocated(addMenuLocator), 5000);
        const addMenuElement = await driver.findElement(addMenuLocator);
        await driver.wait(until.elementIsVisible(addMenuElement), 5000);
        await driver.wait(async function() {
            return (await addMenuElement.isDisplayed()) && (await addMenuElement.isEnabled());
        }, 5000);
        await addMenuElement.click();

        // Fill in the form
        await driver.findElement(By.id(':rc:')).sendKeys('Dish Name'); // Replace with actual data from your Excel
        await driver.wait(until.elementLocated(By.id(":rd:")), 3000);
        await driver.findElement(By.id(":rd:")).sendKeys('Price'); // Replace with actual data from your Excel

        // Select menu category (using a corrected XPath)
        const menuDropdownLocator = By.xpath("//div[@aria-controls=':re:']");
        await driver.wait(until.elementLocated(menuDropdownLocator), 3000);
        const menuDropdownElement = await driver.findElement(menuDropdownLocator);
        await driver.wait(until.elementIsVisible(menuDropdownElement), 3000);
        await driver.wait(async function() {
            return (await menuDropdownElement.isDisplayed()) && (await menuDropdownElement.isEnabled());
        }, 3000);
        await menuDropdownElement.click();

        // Wait for the menu item to appear and click it
        const menuItemLocator = By.xpath("//li[contains(text(), 'Category 1')]");
        await driver.wait(until.elementLocated(menuItemLocator), 3000);
        const menuItemElement = await driver.findElement(menuItemLocator);
        await driver.wait(until.elementIsVisible(menuItemElement), 3000);
        await driver.wait(async function() {
            return (await menuItemElement.isDisplayed()) && (await menuItemElement.isEnabled());
        }, 3000);
        await menuItemElement.click();

        // Add delay if necessary
        await driver.sleep(2000);

    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        await driver.quit(); // Ensure browser is closed after the test
    }
})();
