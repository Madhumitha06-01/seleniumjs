const xlsx = require('xlsx');
const { Builder, By, until, Browser } = require('selenium-webdriver');
const { start } = require('chromedriver');

// Load the Excel file
const workbook = xlsx.readFile("c:\\Users\\Admin\\Documents\\cat.xlsx");

// Read data from the first sheet (categories)
const sheetName1 = workbook.SheetNames[0]; // First sheet
const sheet1 = workbook.Sheets[sheetName1];
console.log("Sheet1:",sheet1);
const data1 = xlsx.utils.sheet_to_json(sheet1, { header: 1 });
const headers1 = data1[0];
const rows1 = data1.slice(1); // Exclude the header row
const startRow1 = 0;
const endRow1 = 3;
const selectedRows1 = rows1.slice(startRow1, endRow1);

// Read data from the second sheet (inventory items)
const sheetName2 = workbook.SheetNames[2]; // Third sheet
const sheet2 = workbook.Sheets[sheetName2];
const data2 = xlsx.utils.sheet_to_json(sheet2, { header: 1 });
const headers2 = data2[0];
const rows2 = data2.slice(1); // Exclude the header row
const startRow2 = 0;
const endRow2 = 2;
const selectedRows2 = rows2.slice(startRow2, endRow2);

console.log('Categories Headers:', headers1);
console.log('Selected Categories:', selectedRows1);
console.log('Items Headers:', headers2);
console.log('Selected Items:', selectedRows2);

(async function runTest() {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    try {
        // Start interacting with the web application
        await driver.get('https://rms-user-three.vercel.app/');
        await driver.findElement(By.id(":r0:")).sendKeys("rasiadmin01@gmail.com");
        await driver.findElement(By.id(":r1:")).sendKeys("rasi@782");
        await driver.findElement(By.id(":r2:")).click();
        await driver.sleep(5000);

        // Navigate to the Inventory page
        await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[6]/div[2]")), 3000);
        await driver.findElement(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[6]/div[2]")).click();
        await driver.sleep(2000); 

        // Add categories
        for (const rowData of selectedRows1) {
            const category = rowData[0];
            console.log('Adding Category:', category);

             //Add category button 
             await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/div/div/div/div[1]/div/div[2]/button[2]")), 5000);
             await driver.findElement(By.xpath("/html/body/div/div/div/div/div/div[1]/div/div[2]/button[2]")).click();
            await driver.sleep(10000);

              //category
await driver.wait(until.elementsLocated(By.name('category')), 10000);
await driver.findElement(By.name('category')).sendKeys(category);
await driver.sleep(10000);
//create
await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div[3]/div/form/div[2]/button[2]')), 5000);
await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/form/div[2]/button[2]')).click();
await driver.sleep(3000);
        }
        // Add inventory items
        for (const rowData of selectedRows2) {
            const [itemname, prunit, ppunit, quantity, lowstack, suppname, contactnum, contactadd, category, tag, price, expiryDate] = rowData;

            // Date format conversion
            let parsedExpiryDate = expiryDate;
            if (typeof expiryDate === 'number') {
                const excelDate = new Date((expiryDate - 25569) * 86400 * 1000);
                parsedExpiryDate = excelDate.toISOString().split('T')[0];
            }

            console.log('Adding Item:', { itemname, prunit, ppunit, quantity, lowstack, suppname, contactnum, contactadd, category, tag, price, parsedExpiryDate });

            // Add item button
 // Add item botton 
 await driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/div/div/div/div[1]/div/div[2]/button[1]")), 5000);
 await driver.findElement(By.xpath("/html/body/div/div/div/div/div/div[1]/div/div[2]/button[1]")).click();
 await driver.sleep(3000);
            // Fill out item form
            await driver.wait(until.elementLocated(By.name("product")), 10000).sendKeys(itemname);
            await driver.wait(until.elementLocated(By.name("productUnit")), 10000).sendKeys(prunit);
            await driver.wait(until.elementLocated(By.name("pricePerUnit")), 10000).sendKeys(ppunit);
            await driver.wait(until.elementLocated(By.name("quantity")), 5000).sendKeys(quantity);
            await driver.wait(until.elementLocated(By.name("lowStockThreshold")), 5000).sendKeys(lowstack);
            await driver.wait(until.elementLocated(By.name("supplierName")), 5000).sendKeys(suppname);
            await driver.wait(until.elementLocated(By.name("contactNumber")), 5000).sendKeys(contactnum);
            await driver.wait(until.elementLocated(By.name("contactAddress")), 5000).sendKeys(contactadd);

            // Category selection
            await driver.wait(until.elementLocated(By.xpath('//*[@id="mui-component-select-category"]')), 10000).click();
            await driver.wait(until.elementLocated(By.xpath(`//li[contains(text(),'${category}')]`)), 10000).click();

            // Tag
            await driver.wait(until.elementLocated(By.name("tag")), 5000).sendKeys(tag);

            // Price
            await driver.wait(until.elementLocated(By.name("price")), 5000).sendKeys(price);

            // Expiry date
            await driver.wait(until.elementLocated(By.name('expiryDate')), 5000).sendKeys(parsedExpiryDate);

            // Create button
            await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Create')]")), 5000).click();
            await driver.sleep(3000);
        }
    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
       // await driver.quit(); // Ensure browser is closed after the test
    }
})();
