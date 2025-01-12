const{ Builder ,By, keys, until, Browser} = require('selenium-webdriver');
const assert = require("assert");
(
    async function example() {
        let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        await driver.get("https://practicetestautomation.com/practice-test-login");
        await driver.findElement (By.id("username")).sendKeys("student");
        await driver.findElement(By.id("password")).sendKeys("Password123");
        await driver.findElement(By.id("submit")) .click();
       const size =  await driver.manage().window().getRect();
       console.log(size.height+"  "+size.width);
       
       // assert login test

       await driver.get("https://test-login-app.vercel.app/");
       // Select input elements and fill them out
       await driver.findElement(By.id("email")).sendKeys("test3@gmail.com");
       await driver.findElement(By.id("password")).sendKeys("Password@12345");
       // Select login button and invoke click action
       //If login details are correct we wiil be redirected to the welcome page
       await driver.findElement(By.name("login")).click();
       //On succesful login get page title
       //Check page title, to confirm login was successful
       const pageTitle = await driver.getTitle();
       // assert usign node assertion
       assert.strictEqual(pageTitle, "Welcomepage");
       //Check if redirect to login page was successfull
       await driver.wait(until.titleIs("Welcomepage"), 4000);
       }
)();