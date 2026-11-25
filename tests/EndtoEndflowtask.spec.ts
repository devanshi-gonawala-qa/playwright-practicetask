import{test,expect} from '@playwright/test';
/*Q1: End-to-End: Register New User Account
Website: https://www.automationexercise.com/
Pages: Home → Signup/Login → Account Information → Account Created
Full End-to-End Flow:
- Open the website Home page
- Navigate to Signup / Login page
- Fill the Signup form (Name + Email) and click Signup
- On Account Information page:
• Select 'Mr' radio button (Title)
• Fill Password
• Select Day, Month, Year of Birth from dropdowns
• Check Newsletter checkbox
• Check Special Offers checkbox
• Fill First Name, Last Name
• Fill Address, City, State, Zipcode, Mobile Number
• Select Country from dropdown
- Click 'Create Account' button
- Validate that the heading "ACCOUNT CREATED!" is visible
Condition:
- Use minimum 4 different locator strategies:
1. XPath — for Signup form fields
2. CSS id (#id) — for Account Info fields
3. getByRole() — for Create Account button
4. getByText() — for Account Created validation
5. data-qa attr — for Create Account button (bonus)*/
test("End-to-End: Register New User Account", async({page}) => {
    await page.goto("https://www.automationexercise.com/");
    await page.getByRole("link", {name : "Signup / Login"}).click();
    await page.locator("input[data-qa='signup-name']").fill("kayraj");
    await page.locator("input[data-qa='signup-email']").fill("kayraj12@gmail.com");
    await page.getByRole("button" , {name: "signup"}).click();
    // Account Information - CSS ID
    await page.locator("#id_gender1").check();
    await page.locator("#password").fill("kayraj@123");
    await page.locator("#days").selectOption("16");
    await page.locator("#months").selectOption("10");
    await page.locator("#years").selectOption("2004");
    await page.locator("#newsletter").check();
    await page.locator("#optin").check();
    await page.locator("#first_name").fill("Jayraj");
    await page.locator("#last_name").fill("Test");
    await page.locator("#address1").fill("Althan, Surat");
    await page.locator("#city").fill("Surat");
    await page.locator("#state").fill("Gujarat");
    await page.locator("#zipcode").fill("395004");
    await page.locator("#mobile_number").fill("9876541230");
    await page.locator("#country").selectOption({ label: "India" });
    await expect(page.locator("[data-qa='create-account']")).toBeVisible();
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(page.getByText("Account Created!", {exact:true})).toBeVisible();
});