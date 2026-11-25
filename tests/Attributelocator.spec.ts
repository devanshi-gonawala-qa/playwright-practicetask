import {test} from '@playwright/test';
test("attribute locator task", async({page}) => {
    await page.goto("https://www.automationexercise.com/login");
    await page.locator("input[name = 'name']").fill("dsds")
    const s = await page.locator("input[name='name']").inputValue();
    console.log("fetch input value is : " + s)
    if (s === "Devanshi"){
        console.log("Value properly entered");
    }else{
        throw new Error("Value not properly entered");
    }
});