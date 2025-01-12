const{ Builder ,By, keys, until, Browser} = require('selenium-webdriver');
const assert = require("assert");
(
    async function example() {
        let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
       await driver.get('https://rms-user-three.vercel.app/');
        await driver.findElement(By.id(":r0:")).sendKeys("rasiadmin01@gmail.com");
        await driver.findElement(By.id(":r1:")).sendKeys("rasi@782");
        await driver.findElement(By.id(":r2:")).click();
        await driver.sleep(1000);
                    //User
                    await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[3]")), 3000);
                    await driver.findElement(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[3]")).click();
                    // Add user
                    await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/div/div/div/div[1]/div/button")), 3000);
                    await driver.findElement(By.xpath("/html/body/div/div/div/div/div/div[1]/div/button")).click();
                    //Name
                    await driver.wait(until.elementLocated(By.id(":rc:")),5000);
                    await driver.findElement(By.id(":rc:")).sendKeys("firstname");
                    //lastname
                    await driver.wait(until.elementLocated(By.id(":rd:")),5000);
                    await driver.findElement(By.id(":rd:")).sendKeys("lastname");
                    //em
                    await driver.wait(until.elementLocated(By.id(":re:")),5000);
                    await driver.findElement(By.id(":re:")).sendKeys("email");
                    //phno
                    await driver.wait(until.elementLocated(By.id(":rf:")),5000);
                    await driver.findElement(By.id(":rf:")).sendKeys("phone");
                    //city
                    await driver.wait(until.elementLocated(By.id(":rg:")),5000);
                    await driver.findElement(By.id(":rg:")).sendKeys("city");
                    //role
                    await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[6]/div/div/div")),5000);
                    await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[6]/div/div/div")).click();
                    await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div[3]/ul/li[3]")),5000);
                    await driver.findElement(By.xpath("/html/body/div[3]/div[3]/ul/li[3]")).click();
        
                    // create
                 //   await driver.wait(until.elementLocated(By.id(":ri:")),3000);
                 //   awaitdriver.findElement(By.id(":ri:")).click();
        


        




    })
    ();