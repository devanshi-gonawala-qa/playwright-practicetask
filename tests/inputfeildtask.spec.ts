import {test} from '@playwright/test'
test ("input feild task " , async({page}) => {
   await page.goto("https://www.automationexercise.com/login");

await page.getByPlaceholder("Name").fill("Devanshi");
console.log(await page.getByPlaceholder("Name").inputValue())
// await page.waitForTimeout(3000);
await page.getByRole("textbox" , {name: "Email Address"}).nth(1).fill("test@123.com");
console.log(await page.getByRole("textbox", {name: "Email Address"}).nth(1).inputValue())
// await page.waitForTimeout(3000);
const nameValue = await page.getByPlaceholder("Name").inputValue()
const emailvalue = await page.getByRole("textbox", {name: "Email Address"}).nth(1).inputValue()
if (nameValue === "Devanshi" && emailvalue === "test@123.com"){
    console.log("Validation Passed");
} else{
    console.log("Validation Failed")
}
});