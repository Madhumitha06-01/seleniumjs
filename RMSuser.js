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

// (Menu page)
const workbook3= xlsx.readFile('c:\\Users\\Admin\\Documents\\RMSdata.xlsx');
const sheetName3 = workbook3.SheetNames[4]; 
const sheet = workbook.Sheets[sheetName3];
const data3= xlsx.utils.sheet_to_json(sheet, { header: 1 }); 

console.log('Categories Headers:', headers1);
console.log('Selected Categories:', selectedRows1);
console.log('Items Headers:', headers2);
console.log('Selected Items:', selectedRows2);
// menu
const headers3 = data[0];
const rows = data.slice(1); // Exclude the header row
const startRow = 4; // Starting row (index 5)
const endRow = 6;   // Ending row (index 7, exclusive)
const selectedRows3 = rows.slice(startRow, endRow);
// Log headers for reference
console.log('Headers:', headers3);
console.log('Selected Rows:', selectedRows3);

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
    


    // MENU
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
     // USER 
      // Navigate to the User section
      await driver.wait(until.elementLocated(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[3]")), 3000);
      await driver.findElement(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[3]")).click();

      // Loop through each row in the selected data
      for (const rowData of selectedRows) 
          const [firstname, lastname, email, phone, city, role] = rowData;

          console.log('First Name:', firstname);
          console.log('Last Name:', lastname);
          console.log('Email:', email);
          console.log('Phone:', phone);
          console.log('City:', city);
          console.log('Role:', role);

          // Add user
          await addUser(driver, firstname, lastname, email, phone, city, role);
    

async function addUser(driver, firstname, lastname, email, phone, city, role) {
  try {
      // Click the "Add User" button
      await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Add User')]")), 3000);
      await driver.findElement(By.xpath("//button[contains(text(),'Add User')]")).click();
      await driver.sleep(2000);

      // Fill out the form fields
      await driver.findElement(By.name("firstName")).sendKeys(firstname);
      await driver.findElement(By.name("lastName")).sendKeys(lastname);
      await driver.findElement(By.name("email")).sendKeys(email);
      await driver.findElement(By.name("contactNo")).sendKeys(phone);
      await driver.findElement(By.name("city")).sendKeys(city);

      // Select the role from the dropdown
      await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[6]/div/div/div")), 10000);
      await driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/form/div[1]/div[6]/div/div/div")).click();

      // Select the role by visible text
      await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div[3]/ul/li[contains(text(),'" + role + "')]")), 10000);
      await driver.findElement(By.xpath("/html/body/div[3]/div[3]/ul/li[contains(text(),'" + role + "')]")).click();
      await driver.sleep(3000);

      // Submit the form
      const submitButton = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//*[@id=\"submit\"]'))), 10000);
      await driver.wait(until.elementIsEnabled(submitButton), 10000);
      await submitButton.click();
      await driver.sleep(10000); // Wait for the action to complete




  } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
       // await driver.quit(); // Ensure browser is closed after the test
    }
}
 

