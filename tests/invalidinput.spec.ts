import {test} from '@playwright/test'
test ("invalid input validation checked", async({page}) => {
    await page.goto("https://www.automationexercise.com/login");
    await page.getByRole("textbox", {name: "Email Address"}).nth(0).fill("devanshi123.com");
    await page.getByRole("textbox", {name: "password"}).nth(0).fill("Devu123");
    await page.getByRole("button", {name : "Login"}).click();
    const message = await page.getByRole("textbox", {name : "Email Address"}).nth(0).evaluate(emailInput => (emailInput as HTMLInputElement).validationMessage);
    console.log(message);
    if (message !== ""){
      console.log("Validation message is displayed");
    }else{
        console.log("No any error message displayed");
    }
    // await page.waitForTimeout(2000);
});