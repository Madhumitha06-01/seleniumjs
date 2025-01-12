const xlsx = require('xlsx');
const { Builder, By, until, Browser } = require('selenium-webdriver');
const { start } = require('chromedriver');

// Load the Excel file
const workbook = xlsx.readFile('c:\\Users\\Admin\\Documents\\RMSdata.xlsx');
const sheetName = workbook.SheetNames[4]; 
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); 

// Define column headers (if not present, you may need to define these manually)
const headers = data[0];
const rows = data.slice(1); // Exclude the header row
const startRow = 4; // Starting row (index 5)
const endRow = 6;   // Ending row (index 7, exclusive)
const selectedRows = rows.slice(startRow, endRow);


// Log headers for reference
console.log('Headers:', headers);
console.log('Selected Rows:', selectedRows);


(async function runTest() {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    try {   
        // Start interacting with the web application
        await driver.get('https://rms-user-three.vercel.app/');
        await driver.findElement(By.id(":r0:")).sendKeys("rasiadmin01@gmail.com");
        await driver.findElement(By.id(":r1:")).sendKeys("rasi@782");
        await driver.findElement(By.id(":r2:")).click();
        await driver.sleep(1000);
          // Navigate to the menu 
            await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[4]/div[2]")), 3000);
            await driver.findElement(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[4]/div[2]")).click();
            await driver.sleep(2000); 

        // Loop through each row in the Excel data
        for (const rowData of selectedRows) {
            const dishName = rowData[0]; // First column
            const price = rowData[1]; // Second column
            const type = rowData[2]; // Third column
            const category = rowData[3]; // Fourth column
            const kitchen = rowData[4]; // Third column

            console.log('Dish Name:', dishName);
            console.log('Price:', price);
            console.log('Type:', type);
            console.log('Category:', category);
            console.log('Kitchen:', kitchen);
            
           // Click the "Add menu" button
        await driver.wait(until.elementLocated(By.xpath("/html/body/div/div/div/div[1]/div/div[1]/div/button")), 3000);
        await driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div/div[1]/div/button")).click();
      //  await driver.sleep(5000);
            //Name
            await driver.wait(until.elementsLocated(By.name("name")), 3000);
            await driver.findElement(By.name('name')).sendKeys(dishName); // Replace with actual field ID
            // price
            await driver.wait(until.elementsLocated(By.name("price")), 3000);
            await driver.findElement(By.name("price")).sendKeys(price);
           await driver.sleep(5000);

           // Select menu type
             await driver.wait(until.elementsLocated(By.xpath(("(//*[@id='demo-simple-select'])[1]"))), 10000);
             await driver.findElement(By.xpath("(//*[@id='demo-simple-select'])[1]")).click();
             
        // Select the type by visible text
            await driver.wait(until.elementLocated(By.xpath("//li[contains(text(),'" + type + "')]")), 10000);
            await driver.findElement(By.xpath("//li[contains(text(),'" + type + "')]")).click();
            await driver.sleep(3000);
            //Category
           await driver.wait(until.elementLocated(By.xpath("(//*[@id='demo-simple-select'])[2]")), 5000);
          await driver.findElement(By.xpath("(//*[@id='demo-simple-select'])[2]")).click();
          await driver.wait(until.elementLocated(By.xpath("//li[contains(text(),'" + category + "')]")), 10000);
          await driver.findElement(By.xpath("//li[contains(text(),'" + category + "')]")).click();
          await driver.sleep(2000);


            // Kitchen
            await driver.wait(until.elementLocated(By.xpath("(//*[@id='demo-simple-select'])[3]")), 5000);
            await driver.findElement(By.xpath("(//*[@id='demo-simple-select'])[3]")).click();
            await driver.wait(until.elementLocated(By.xpath("//li[contains(text(),'" + kitchen + "')]")), 10000);
            await driver.findElement(By.xpath("//li[contains(text(),'" + kitchen + "')]")).click();
            await driver.sleep(10000); // Adjust as needed 
            // Add
            await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div[3]/div/form/div[2]/button[2]')), 5000);
            await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/form/div[2]/button[2]')).click();
            await driver.sleep(3000);
    


        }

    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        //await driver.quit(); // Ensure browser is closed after the test
    }
})();