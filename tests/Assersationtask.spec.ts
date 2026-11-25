//Assersation task

/*Q1: Website: https://www.automationexercise.com/
Page: Home
Task:
- Open the website
- Capture the page title
- Assert that the title contains 'Automation Exercise'*/

import {test , expect} from '@playwright/test';
test("Page title verify" , async({page}) => {
    await page.goto("https://www.automationexercise.com/")
    console.log("Page title is: " , await page.title())
    await expect(page).toHaveTitle(/Automation Exercise/)
});

// /*Q2 : Website: https://www.automationexercise.com/
// Page: Home
// Field: Logo (Top left)
// Task:
// - Open the website
// - Locate the logo image in the top-left header area
// - Assert that the logo is visible on the page*/

test("Logo verify is: ", async({page}) => {
    await page.goto("https://www.automationexercise.com/")
    //page.locator("div[class= 'logo pull-left']")
    await expect(page.locator("div[class= 'logo pull-left']")).toBeVisible();
});

// /*Q3: Website: https://www.automationexercise.com/

// Page: Signup / Login
// Task:
// - Open the website home page
// - Click the 'Signup / Login' link in the navigation menu
// - Assert that the current URL contains '/login'*/

test("Current URL contains the /login/" , async({page}) => {
    await page.goto("https://www.automationexercise.com/")
    await page.getByRole("link" , { name : "Signup / Login"}).click();
    await expect(page).toHaveURL(/\/login/);
});

/*Q4: Website: https://www.automationexercise.com/login
Page: Signup / Login
Field: 'New User Signup!' heading
Task:
- Open the Signup / Login page
- Capture the text of the 'New User Signup!' heading
- Assert it is an exact match with 'New User Signup!'*/

test("New User signup" , async({page}) => {
    await page.goto("https://www.automationexercise.com/login")
    const pageheading =  page.getByRole("heading" , {name : "New User Signup!"})
     console.log("Heading text is: ", await pageheading.textContent())
    await expect(pageheading).toHaveText("New User Signup!");
});

/*Q5: Website: https://www.automationexercise.com/login
Page: Signup / Login
Field: Login error message
Task:
- Open the Signup / Login page
- Enter an invalid email and invalid password in the login form
- Click the Login button
- Assert that the error message 'Your email or password is incorrect!' is visible*/

test("Invalid credentials message of login" , async({page}) => {
    await page.goto("https://www.automationexercise.com/login")
    await page.locator("input[type='email']").first().fill("tara@gmail.com");
    await page.getByPlaceholder("Password").fill("abcd1234");
    await page.getByRole("button", {name : "Login"}).click()
    await expect(page.getByText("Your email or password is incorrect!" , {exact:true})).toBeVisible()
});