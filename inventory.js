const xlsx = require('xlsx');
const fs = require('fs');
const { Builder, By, until, Browser } = require('selenium-webdriver');
const { start } = require('chromedriver');

// Load the Excel file
const workbook = xlsx.readFile('c:\\Users\\Admin\\Documents\\inventorydata.xlsx');
const sheetName = workbook.SheetNames[0]; 
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); 

// Define column headers (if not present, you may need to define these manually)
const headers = data[0];
const rows = data.slice(1); // Exclude the header row
const startRow = 0; // Starting row (index 5)
const endRow = 3;   // Ending row (index 7, exclusive)
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
        await driver.sleep(3000);
         // Navigate to the Inventory page
         await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[6]/div[2]")), 3000);
         await driver.findElement(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[6]/div[2]")).click();
         await driver.sleep(2000); 


        // Loop through each row in the Excel data
        for (const rowData of selectedRows) {
            const itemname = rowData[0]; // First column
            const prunit = rowData[1]; // Third column
            const ppunit= rowData[2]; // Fourth column
            const quantity= rowData[3]; // Fourth column
            const lowstack= rowData[4]
            const suppname= rowData[5]; // Fourth column
            const contactnum= rowData[6]; // Fourth column
            const contactadd = rowData[7]; // Fourth column
            const category= rowData[8]; // Fourth column
            const tag= rowData[9]; // Fourth column
            const price = rowData[10]; // Fourth column
            const expiryDate= rowData[11]; // Fourth column
            // date format
            let parsedExpiryDate = expiryDate;
            if (typeof expiryDate === 'number') {
                const excelDate = new Date((expiryDate - 25569) * 86400 * 1000);
                parsedExpiryDate = excelDate.toISOString().split('T')[0];
            }

           console.log('Dish Name:', itemname);
           console.log('product:', prunit);
           console.log('pro perunit:', ppunit);
           console.log('Quantity:', quantity);
           console.log('Low Stock:', lowstack);
           console.log('Supplier Name:', suppname);
           console.log('Contact Number:', contactnum);
           console.log('Contact Address:', contactadd);
           console.log('Category:', category);
           console.log('Tag:', tag);
           console.log('Price:', price);
           console.log('Date:', parsedExpiryDate);

              // Add item botton 
              await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/div/div/div/div[1]/div/div[2]/button[1]")), 5000);
              await driver.findElement(By.xpath("/html/body/div/div/div/div/div/div[1]/div/div[2]/button[1]")).click();
// item name
              await driver.wait(until.elementsLocated(By.name("product")), 5000);
              await driver.findElement(By.name("product")).sendKeys(itemname);
//pro unit
               await driver.wait(until.elementsLocated(By.name("productUnit")), 5000)
               await driver.findElement(By.name("productUnit")).sendKeys(prunit);
// price unit
               await driver.wait(until.elementsLocated(By.name("pricePerUnit")), 5000);
              await driver.findElement(By.name("pricePerUnit")).sendKeys(ppunit);
//quty
              await driver.wait(until.elementsLocated(By.name("quantity")), 5000);
              await driver.findElement(By.name("quantity")).sendKeys(quantity);
//low stock
              await driver.wait(until.elementsLocated(By.name("lowStockThreshold")), 5000);
              await driver.findElement(By.name("lowStockThreshold")).sendKeys(lowstack);
//supp name
              await driver.wait(until.elementsLocated(By.name("supplierName")), 5000);
              await driver.findElement(By.name("supplierName")).sendKeys(suppname);
//supp num
              await driver.wait(until.elementsLocated(By.name("contactNumber")), 5000);
              await driver.findElement(By.name("contactNumber")).sendKeys(contactnum);
//sup add
              await driver.wait(until.elementsLocated(By.name("contactAddress")), 5000);
              await driver.findElement(By.name("contactAddress")).sendKeys(contactadd);

//category
await driver.wait(until.elementsLocated(By.xpath('//*[@id="mui-component-select-category"]')), 10000);
await driver.findElement(By.xpath('//*[@id="mui-component-select-category"]')).click();
// Select the type by visible text
await driver.wait(until.elementLocated(By.xpath("//li[contains(text(),'" + category + "')]")), 10000);
await driver.findElement(By.xpath("//li[contains(text(),'" + category + "')]")).click();
await driver.sleep(3000);

//Tag
await driver.wait(until.elementsLocated(By.name("tag")), 5000);
await driver.findElement(By.name("tag")).sendKeys(tag);
//price
await driver.wait(until.elementsLocated(By.name("price")), 5000);
await driver.findElement(By.name("price")).sendKeys(price);
await driver.sleep(3000);
//date
await driver.wait(until.elementsLocated(By.name('expiryDate')), 5000);
await driver.findElement(By.name('expiryDate')).sendKeys(parsedExpiryDate);
await driver.sleep(5000);

     // Create
     await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div[3]/div/form/div[2]/button[2]')), 5000);
     await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/form/div[2]/button[2]')).click();
     await driver.sleep(3000);
        



await driver.sleep(2000); // Adjust as needed
        }

    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        await driver.quit(); // Ensure browser is closed after the test
    }
})();
