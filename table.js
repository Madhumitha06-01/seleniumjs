const xlsx = require('xlsx');
const fs = require('fs');
const { Builder, By, until, Browser } = require('selenium-webdriver');
const { start } = require('chromedriver');

// Load the Excel file
const workbook = xlsx.readFile('c:\\Users\\Admin\\Documents\\RMSdata.xlsx');
const sheetName = workbook.SheetNames[1]; 
const sheet = workbook.Sheets[sheetName];
console.log("sheet");
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); 
//Define column
const headers = data[0];
const rows = data.slice(1); // Exclude the header row
const startRow = 0; // Starting row (index 5)
const endRow = 2;   // Ending row (index 7, exclusive)
const selectedRows = rows.slice(startRow, endRow);

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
        await driver.sleep(3000);
        //Navvigate to Table page
         await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[5]/div[2]")), 3000);
         await driver.findElement(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[5]/div[2]")).click();
         await driver.sleep(2000); 
         //loop
         for (const rowData of selectedRows) {
            const TableName = rowData[0]; // First column
            const SeatCount = rowData[1]; // Third column
            const Floor= rowData[2]; // Fourth column
            const Location= rowData[3]; // Fourth column
            //
            console.log('Table Name:', TableName);
           console.log('Seat Count:', SeatCount);
           console.log('Floor:', Floor);
           console.log('Location:', Location);

         //Add table 
         await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/div/div/div/div[1]/div/button")), 5000);
         await driver.findElement(By.xpath("/html/body/div/div/div/div/div/div[1]/div/button")).click();
        //Table name
        await driver.wait(until.elementsLocated(By.name("tableKey")), 5000);
         await driver.findElement(By.name("tableKey")).sendKeys(TableName);
         await driver.sleep(3000);

         //Seat count
         await driver.wait(until.elementsLocated(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[2]/div/div")), 10000);
         await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[2]/div/div")).click();
         // Select the type by visible text
          await driver.wait(until.elementLocated(By.xpath("//li[contains(text(),'" + SeatCount + "')]")), 20000);
          await driver.findElement(By.xpath("//li[contains(text(),'" + SeatCount + "')]")).click();
          await driver.sleep(3000);
         //Floor
         await driver.wait(until.elementsLocated(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[3]/div/div/div")), 5000);
         await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[3]/div/div/div")).click();
         await driver.sleep(2000); 
         // Select the type by visible text
           await driver.wait(until.elementLocated(By.xpath("//li[contains(text(),'" + Floor + "')]")), 5000);
            await driver.findElement(By.xpath("//li[contains(text(),'" + Floor + "')]")).click();
            await driver.sleep(3000);
         //Location
         await driver.wait(until.elementsLocated(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[4]/div/div/div")), 5000);
         await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[4]/div/div/div")).click();
         await driver.sleep(2000); 
         // Select the type by visible text
        await driver.wait(until.elementLocated(By.xpath("//li[contains(text(),'" + Location + "')]")), 5000);
        await driver.findElement(By.xpath("//li[contains(text(),'" + Location + "')]")).click();
        await driver.sleep(5000);
         //Create button
         await driver.wait(until.elementsLocated(By.xpath('/html/body/div[2]/div[3]/div/form/div[2]/button[2]')), 10000);
         await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/form/div[2]/button[2]')).click();
         await driver.sleep(3000); 
         }

    }
    catch(error){
        console.log('Error during test:',error);
  }
  finally{
   // await driver.quit();
  }
})();