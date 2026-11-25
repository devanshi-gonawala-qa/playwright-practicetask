import {test} from '@playwright/test'
test ("clear and renter " , async({page}) => {
    await page.goto("https://www.automationexercise.com/login");
await page.getByRole("textbox", {name :"Email Address"}).nth(1).fill("test@123.com");
// await page.waitForTimeout(2000);
await page.getByRole("textbox", {name :"Email Address"}).nth(1).clear();
// await page.waitForTimeout(2000);
await page.getByRole("textbox", {name:"Email Address"}).nth(1).fill("testing@123.com")
const newemail = await page.getByRole("textbox", {name:"Email Address"}).nth(1).inputValue()
if (newemail === "testing@1234.com"){
    console.log("New email entered properly");
}else{
    console.log("previous or wrong email entered")
}
});