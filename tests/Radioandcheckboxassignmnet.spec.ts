import {expect, test} from '@playwright/test'

/*Q1: Radio button selection
Website: https://www.automationexercise.com/
Page: Enter Account Information (reached after Signup)
Field: Title radio button (Mr / Mrs)
Task:
- Navigate to the Account Information page via Signup
- Select the 'Mr' radio button
- Verify that the 'Mr' radio button is checked
- Verify that the 'Mrs' radio button is NOT checked*/
test("Radio button", async({page}) => {
await page.goto("https://www.automationexercise.com/")
await page.getByRole("link" , {name : 'login'}).click()
await page.getByPlaceholder("Name").fill("Tejal")
await page.locator("input[type= 'email']").nth(1).fill("Tejal@gmail.com")
await page.getByRole("button", {name: 'Signup'}).click();
await page.getByLabel("Mrs").check()
// Verify Mrs is checked
await expect(page.getByRole("radio", { name: "Mrs." })).toBeChecked();
// Verify Mr is NOT checked
await expect(page.getByRole("radio", { name: "Mr." })).not.toBeChecked();
// await page.waitForTimeout(2000)
});

/*Q2: Checkbox selection
Website: https://www.automationexercise.com/
Page: Enter Account Information
Field: Newsletter checkbox
Task:
- Navigate to the Account Information page via Signup
- Select the Newsletter checkbox
- Verify the checkbox is checked*/

test("Checkbox selection" , async({page}) => {
    await page.goto("https://www.automationexercise.com/")
    await page.getByRole("link" , {name : 'login'}).click()
    await page.getByPlaceholder("Name").fill("Tejal")
    await page.locator("input[type= 'email']").nth(1).fill("Tejal@gmail.com")
    await page.getByRole("button", {name: 'Signup'}).click();
    await page.getByRole("checkbox", {name: 'Sign up for our newsletter!'}).check();
    await expect(page.getByRole("checkbox", {name: 'Sign up for our newsletter!'})).toBeChecked();
    await page.waitForTimeout(2000)
});

/*Q3: Uncheck checkbox
Website: https://www.automationexercise.com/
Page: Enter Account Information
Field: Special Offers checkbox
Task:
- Navigate to the Account Information page via Signup
- First check the Special Offers checkbox
- Then uncheck it
- Verify the final state is unchecked*/

test("Uncheck checkbox", async({page}) => {
    await page.goto("https://www.automationexercise.com/")
    await page.getByRole("link" , {name : 'login'}).click()
    await page.getByPlaceholder("Name").fill("Tejal")
    await page.locator("input[type= 'email']").nth(1).fill("Tejal@gmail.com")
    await page.getByRole("button", {name: 'Signup'}).click();
    const specialoffer = page.getByRole("checkbox", {name: 'Receive special offers from our partners!'})
    // check offer checkbox
    await specialoffer.check();
    await page.waitForTimeout(2000)
    // uncheck offer checkbox
    await specialoffer.uncheck();
    await expect(specialoffer).not.toBeChecked();
    // just for printing message
    console.log("Special offer checkbox is check: " + await specialoffer.isChecked());
    await page.waitForTimeout(2000);
});

/*Q4: Multiple checkbox handling
Website: https://www.automationexercise.com/
Page: Enter Account Information
Fields: Newsletter checkbox, Special Offers checkbox
Task:
- Navigate to the Account Information page via Signup
- Select all available checkboxes on the page
- Print the checked state of each checkbox
- Verify all checkboxes are selected*/

test("Multiple checkbox handling", async({page}) => {
    await page.goto("https://www.automationexercise.com/");
    await page.getByRole("link", {name : "login"}).click();
    await page.getByPlaceholder("Name").fill("Tejal");
    await page.locator("input[type= 'email']").nth(1).fill("Tejal@gmail.com")
    await page.getByRole("button", {name: 'Signup'}).click();
// Select Newsletter checkbox
    const newsatteler = page.getByRole("checkbox", {name: 'Sign up for our newsletter!'})
    await newsatteler.check()
// Select Special Offers checkbox
    const specialoffer = page.getByRole("checkbox", {name: 'Receive special offers from our partners!'})
    await specialoffer.check(); 
// Print checked states
    console.log("Newsatteler is checked : " + await newsatteler.isChecked());
    console.log("Specialoffer is checked : " + await specialoffer.isChecked());
// Verify all checkboxes are selected
    await expect(newsatteler).toBeChecked();
    await expect(specialoffer).toBeChecked();
    console.log("Both checkboxes are successfully selected!");
})

/* Default selection validation
Website: https://www.automationexercise.com/
Page: Enter Account Information
Field: Title radio buttons (Mr / Mrs)
Task:
- Navigate to the Account Information page via Signup
- Without clicking any radio button, check if any Title radio button is pre-selected by default
- Print the default selection state of both radio buttons*/

test("Default selection validation" , async({page}) => {
    await page.goto("https://www.automationexercise.com/")
    await page.getByRole("link", {name : "login"}).click();
    await page.getByPlaceholder("Name").fill("Tejal");
    await page.locator("input[type= 'email']").nth(1).fill("Tejal@gmail.com")
    await page.getByRole("button", {name: 'Signup'}).click();
// Check default selection state
    const mrRadiobuttoncheck = page.getByRole("radio" , {name : "Mr."})
    const mrsRadiobuttoncheck = page.getByRole("radio" , {name : "Mrs."})
// Check default selection state
    const mrchecked = await mrsRadiobuttoncheck.isChecked();
    const mrschecked = await mrRadiobuttoncheck.isChecked();
// Print default selection state
    console.log("Mr. Radio button: " ,mrchecked);
    console.log("Mrs. Radio button: ", mrschecked);
// Verify default selection
    if (mrchecked) {
        console.log("Mr. is selected by default");
    } else if (mrschecked) {
        console.log("Mrs. is selected by default");
    }
    else {
        console.log("No radio button is selected by default");
    }
});