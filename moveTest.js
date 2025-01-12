const {Builder,Browser, By, key, utill} = require('selenium-webdriver');

(async function example1() {
    let driver = await new Builder().forBrowser(Browser.FIREFOX ).build();
    try{
        await driver.get('https://www.google.com');
        await driver.navigate().to ("https://www.figma.com/wireframe-tool/?utm_source=google&utm_medium=cpc&utm_campaign=21049479560&utm_term=wireframe%20design&utm_content=692128827748&utm_adgroup=157943777166&gad_source=1&gclid=EAIaIQobChMI-77Yqu-ZhwMV9GAPAh1uSgk0EAAYAiAAEgIHSfD_BwE");
        const srcEle = await driver.findElement(By.className("css-yfdd1w"));
        const targetEle =await driver.findElement(By.className("css-47fgbh"));
        await driver.actions().dragAndDrop(srcEle,targetEle).perform()
        await driver.sleep(3000);
     }
     finally {
        await driver.quit();
     }
})();
     