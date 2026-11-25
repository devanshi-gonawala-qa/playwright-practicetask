import {test, expect} from '@playwright/test';
/*Q1: getByRole() - click login button
Website: https://www.automationexercise.com/login
Page: Signup / Login
Field: Login button
Task:
- Open the Signup / Login page
- Enter email and password in the Login form
- Locate the Login button using getByRole()
- Click the button
- Assert the URL changes after successful login*/
test("getByRole locator" , async({page}) => {
    await page.goto("https://www.automationexercise.com/login")
    await page.getByRole("textbox", {name: "Email Address"}).nth(0).fill("devu@yopmail.com");
    await page.getByRole("textbox" , {name: "password"}).fill("devu@yopmail.com")
    await page.getByRole("button" , {name: "Login"}).click();
    await expect(page).toHaveURL("https://www.automationexercise.com/")
});

/*Q2: getByText() - Assert Handling visible
Website: https://www.automationexercise.com/login
Page: Signup / Login
Field: 'New User Signup!' heading
Task:
- Open the Signup / Login page
- Locate the 'New User Signup!' heading using getByText()
- Assert that the heading is visible on the page
- Also print the text content to the console*/
test("getByText() - Assert Handling visible", async({page}) => {
    await page.goto("https://www.automationexercise.com/login");
    const verifytitle =  page.getByText("New User Signup!")
    await (verifytitle).isVisible();
    const titletext = await verifytitle.textContent();
    console.log("Page title is: " + titletext);
});

/*Q3: getByPlaceholder() - Enter value in email feild
Website: https://www.automationexercise.com/login
Page: Signup / Login
Field: Email input in Login section (placeholder: 'Email Address')
Task:
- Open the Signup / Login page
- Locate the Email input field using getByPlaceholder()
- Enter an email value
- Fetch the entered value using inputValue()
- Assert the value matches what was entered*/
test("Enter value in email feild using getbyplaceholder()" , async({page}) => {
   await page.goto("https://www.automationexercise.com/login");
   const emailvalue =  page.getByPlaceholder("Email Address").nth(0);
   await emailvalue.fill("devu@yopmail.com");
   await expect(emailvalue).toHaveValue("devu@yopmail.com");})

/*Q4: getbylabel : select radio button
Website: https://www.automationexercise.com/
Page: Enter Account Information (reached after Signup)
Field: Title radio button — 'Mr'
Task:
- Navigate to the Account Information page via Signup
- Locate the 'Mr' radio button using getByLabel()
- Click / check the radio button
- Assert the radio button is checked*/
test("Select radio button using getbylabel", async({page}) => {
   await page.goto("https://www.automationexercise.com/");
   await page.getByRole("link", {name : "Signup / Login"}).click();
   await page.getByRole("textbox" , {name: "name"}).fill("Jayraj")
   await page.getByRole("textbox", {name: "Email Address"}).nth(1).fill("jayraj@gmail.com");
   await page.getByRole("button" , {name: "signup"}).click();
   const radiobuttonclick = page.getByLabel("Mr.");
   await radiobuttonclick.check();
   await expect(radiobuttonclick).toBeChecked();
});

/*Q5: gebyAltText() - Verify logo visible
Website: https://www.automationexercise.com/
Page: Home
Field: Logo image (top-left header)
Task:
- Open the Home page
- Locate the logo image using getByAltText()
- Assert the logo is visible
- Also print the src attribute of the logo to the console*/

test("Verify logo visible using getbyalttext()", async({page}) => {
   await page.goto("https://www.automationexercise.com/")
   const logoverify = page.getByAltText("Website for automation practice");
   await expect(logoverify).toBeVisible();
   const logosrc = await logoverify.getAttribute("src")
   console.log("Logo src is : " + logosrc);
});