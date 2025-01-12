const{ Builder ,By, keys, until, Browser} = require('selenium-webdriver');
(
    async function example() {
        let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        await driver.get("https://the-internet.herokuapp.com/upload");
        await driver .findElement(By.id("file-upload")).sendKeys("c:\\Users\\Admin\\Downloads\\istockphoto-1292991881-1024x1024.jpg");
        await driver.findElement(By.id("file-submit")).submit();
        await driver.sleep(3000);
      
    })();
