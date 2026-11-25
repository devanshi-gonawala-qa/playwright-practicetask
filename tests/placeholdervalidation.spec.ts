import {test} from '@playwright/test';
test("placeholder check validation", async ({page}) => {
    await page.goto("https://www.automationexercise.com/login");    
    const s = await page.getByPlaceholder("Email Address").nth(0).getAttribute("placeholder")
    console.log(s)
    if (s === "Email Address"){
        console.log("Placeholder is correct");
    }else{
        console.log("Placeholder is incorrect")
    }
});