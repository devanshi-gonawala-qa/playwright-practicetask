import {test} from '@playwright/test';
test ("xpath locator to clicking login button: ", async({page}) => {
    await page.goto("https://www.automationexercise.com/login");
    await page.locator("//input[@data-qa='login-email']").fill("devu@yopmail.com");
    await page.locator("//input[@name = 'password']").fill("devu@yopmail.com");
    // await page.waitForTimeout(1000);
    await page.locator("//button[text() = 'Login']").click();
    // await page.waitForTimeout(1000);
    const URL = page.url();
    if (!URL.includes('/login')){
        console.log("Login successful: URL no longer contains /login");
    }else {
        throw new Error("URL still contains /login")
    }
})