const{ Builder ,By, keys, until, Browser} = require('selenium-webdriver');
const assert = require("assert");
(
      async function example() {
        let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        await driver.get('https://rms-admin-psi.vercel.app/');
        try{
        await driver.findElement (By.id(":r0:")).sendKeys("superadmin@gmail.com");
        await driver.findElement(By.id(":r1:")).sendKeys("12345678");
        await driver.findElement(By.id(":r2:")).click();
       // await driver.sleep(2000);
        // get title 
        const pageTitle= await driver.getTitle();
        console.log(pageTitle);
        //welcome page
        assert.strictEqual(pageTitle,"Hi ,Welcome back!");
       await driver.wait (until .titleIs(" Hi,Welcome back!"),4000);
         }
          catch (error){
        console.error(' Error during login:' ,error);
      }
    
      try{
    
       //Dashboard
        await driver.wait(until.elementLocated(By.xpath("//a[@href='/dashboard']")), 5000);
        await driver.findElement(By.xpath("//a[@href='/dashboard']")).click();
        await driver.sleep(3000);
        
        //Admin
        await driver.wait(until.elementLocated(By.xpath("//a[@href='/admin']")), 3000);
        await driver.findElement(By.xpath("//a[@href='/admin']")).click();
        await driver.sleep(3000);
        await driver.findElement(By.id(":rb:")).sendKeys("supers admin");
        await driver.sleep(3000);
    /*    // Edit 
        await driver .findElement(By.className("MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-sizeLarge css-1y930w8")).click();
        await driver.wait(until.elementLocated(By.xpath("//li[@class='MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1dc3rk8' and contains(text(), 'Edit')]")));
        await driver. findElement(By.xpath("//li[@class='MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1dc3rk8' and contains(text(), 'Edit')]")).click();
        await driver.findElement(By.id(":rg:")).sendKeys("s");
        await driver.findElement(By.id(":rm:")).click();
        // Add admin
        await driver.findElement(By.xpath("/html/body/div/div/div/div/div/div[1]/div/button")).click();
        await driver.findElement(By.id (":r2g:")).sendKeys("Super admin");
        await driver.findElement(By.id (":r2g:-label")).sendKeys("3");
        await driver.findElement(By.id (":r2i:")).sendKeys("superadmin03@gmail.com");
        await driver.findElement(By.id (":r2k:")).sendKeys("9876543210");
         await driver.sleep(3000);*/


     /*   //Restaurant 
        await driver.wait(until.elementLocated(By.xpath("//a[@href='/restaurant']")), 3000);
        await driver.findElement(By.xpath("//a[@href='/restaurant']")).click();
        await driver.sleep(3000); */

         //Restaurant user 
         await driver.wait(until.elementLocated(By.xpath("//a[@href='/user']")), 3000);
         await driver.findElement(By.xpath("//a[@href='/user']")).click();
         await driver.sleep(3000);
         await driver.wait(until.elementLocated(By.className("MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9")),5000);
         await driver.findElement(By.className("MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-1l6c7y9")).click();
         await driver.findElement(By.id(":ri:")).sendKeys("Green veg");
         await driver.findElement(By.id(":rj:")).sendKeys("1");
         await driver.findElement(By.id(":rk:")).sendKeys("greenveg01@gmail.com");
         await driver.findElement(By.id(":rl:")).sendKeys("9876543210");
         await driver.findElement(By.id(":rm:")).sendKeys("9876543210");
         await driver.findElement(By.id(":r3m:")).click();




         
      }
      catch (error){
        console.error ('Error during click:',error);

      }

      // Log out 
     // await driver.findElement(By.className("MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault css-k7fghw")).click();
      //await driver.findElement(By.className("MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1xtcox7")).click();





    })();
  


