import {test} from '@playwright/test';
test("Email input by chained locator", async({page}) => {
    await page.goto("https://www.automationexercise.com/login");  
    const signupsection = page.locator(".signup-form");
    const emailinput = signupsection.locator("input[type= 'email']")
    await emailinput.fill("devu@yopmail.com");
    const value = await emailinput.inputValue();
    console.log("Fetched email value : " + value);
    if (value === "devu@yopmail.com"){
        console.log("Written mail is perfect")
    }else{
        throw new Error("Email value doesn't proper entered")
    }
    // await page.waitForTimeout(1000);
});