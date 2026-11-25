import {test} from '@playwright/test';
test ("Css locator click: ", async({page}) => {
    await page.goto("https://www.automationexercise.com/")
    await page.locator('a[href="/login"]').click();
    // await expect(page).toHaveURL(/\/login/); // using expect if using expect add the keyword in import line
    const url = page.url();
    if (url.includes('/login')){
        console.log("Test passed: URL contains /login")
    }else{
       console.log("Test Failed: URL not contains /login")
    }
});

