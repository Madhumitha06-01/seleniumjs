const { Builder, By , Key, until, Browser} = require('selenium-webdriver');
const assert = require('assert');
( 
    async function example(){
        let driver= await new Builder().forBrowser(Browser.FIREFOX).build();
        // alert accept 
        await driver.get('https://www.selenium.dev/selenium/web/alerts.html');
        await driver.findElement(By.id("alert")).click();
        await driver.wait(until.alertIsPresent());
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        await driver.sleep(3000);
        await alert.accept();
        // Verify
        assert.equal(alertText, "cheese");
        console.log(alertText);
        // alert dismiss
        await driver.get('https://www.selenium.dev/selenium/web/alerts.html');
        await driver.findElement(By.id("confirm")).click();
        await driver.wait(until.alertIsPresent());
        let alert1 = await driver.switchTo().alert();
        let alertText1 = await alert1.getText();
        await driver.sleep(3000);
        await alert1.dismiss();
        // Verify
        assert.equal(alertText1, "Are you sure?");
        // enter a text 
        await driver.findElement(By.id("prompt")).click();
        await driver.wait(until.alertIsPresent());
        let alert2 = await driver.switchTo().alert();
        await alert .sendKeys('welcome');
        await alert2.accept();





    }
)();