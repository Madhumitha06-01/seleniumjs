const xlsx = require('xlsx');
const { Builder, By, until, Browser } = require('selenium-webdriver');

// Load the Excel file
const workbook = xlsx.readFile('c:\\Users\\Admin\\Documents\\RMSdata.xlsx');
const sheetName = workbook.SheetNames[3]; 
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); 

// Define column headers (if not present, you may need to define these manually)
const headers = data[0];
const rows = data.slice(1); // Exclude the header row
const startRow = 1; // Starting row (index 0)
const endRow = 3;   // Ending row (index 3, exclusive)
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

        // Navigate to the User section
        await driver.wait(until.elementLocated(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[3]")), 3000);
        await driver.findElement(By.xpath("/html/body/div/div/nav/div/div/div/div[2]/div/ul/a[3]")).click();

        // Loop through each row in the selected data
        for (const rowData of selectedRows) {
            const [firstname, lastname, email, phone, city, role] = rowData;

            console.log('First Name:', firstname);
            console.log('Last Name:', lastname);
            console.log('Email:', email);
            console.log('Phone:', phone);
            console.log('City:', city);
            console.log('Role:', role);

            // Add user
            await addUser(driver, firstname, lastname, email, phone, city, role);
        }
    } catch (error) {
        console.error('Error during test execution:', error);
    }finally {
      await driver.quit(); // Ensure browser is closed after the test
    }
})();

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
        console.error('Error adding user:', error);
    }
}