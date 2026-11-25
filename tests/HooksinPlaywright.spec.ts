import {test,expect, Page} from '@playwright/test';
import { before } from 'node:test';
import { unlink } from 'node:fs/promises';
import fs from 'node:fs/promises';
/*Q1: beforeAll() - One time setup before All tests
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: Static Web Table (Section 3)
Real-World Scenario:
You are testing a web table that shows student data. Before running any
test in the suite, you want to open the browser ONCE, navigate to the
page ONCE, and verify the page loaded correctly. All 3 tests then reuse
the same browser session — saving time and reducing overhead.
Task:
- Use test.beforeAll() to open the browser and navigate to the page once
- Write 3 tests that all use the shared page:
Test 1: Assert the page title is correct
Test 2: Assert the Static Web Table heading is visible
Test 3: Assert the table has at least 1 row of student data
- Use test.afterAll() to close the browser after all tests finish
- Show console logs for each hook and test firing order*/ 

test.describe.serial('serial verifyting title flow' ,() => {
    let page : Page;
test.beforeAll(async({browser}) => {
    console.log('1. beforeAll: Creating browser page'); 
    page = await browser.newPage();
    console.log('2. beforeAll: Navigating to website');
    await page.goto("https://www.stadsolution.com/automation-testing-practice/");
    console.log('3. beforeAll: Website opened successfully');
});
test("Home page title is correct" , async() => {
    console.log('4. Test 1: Checking page title');
    await expect(page).toHaveTitle("Automation Testing Practice - Best Software Testing Training Institute in India | STAD Solution");
});
test("Static Web title heading is visible", async() => {
    console.log('5. Test 2: Checking table heading');
    const headingtitle = page.getByText("Static Web Table");
    await expect(headingtitle).toBeVisible();
});
test("Verify atleast 1 data", async() => {
    console.log('6. Test 3: Checking student table rows');
    const verifydata = page.locator("//tbody/tr");
    await expect(verifydata.first()).toBeVisible();
});
test.afterAll(async () => {
     console.log('7. afterAll: Closing browser page');
    await page.close();  
    console.log('8. afterAll: Browser page closed');
});
});

/*Q2: afterAll - one Time Teardown after All tests
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: GUI Form Elements (Section 1) — Full Name, Email, Phone
Real-World Scenario:
You are testing a form that collects user data. During testing, the suite
creates temporary test files (screenshots, reports, logs) that must be
cleaned up after all tests complete. afterAll is used to delete test
artefacts, print a summary report, and confirm cleanup is done.
Task:
- Use test.beforeAll() to navigate to the page and create a test log file
- Write 2 tests that fill form fields and take screenshots:
Test 1: Fill Full Name + Email → take screenshot
Test 2: Fill Phone + Address → take screenshot
- Use test.afterAll() to:
• Delete all screenshot files created during tests
• Print a final summary of what was cleaned up
• Assert cleanup was successful*/

test.describe.serial("Filling form, take screenshot and cleanup" , () => {
    let page :Page;
test.beforeAll(async({browser}) => {
    console.log("beforeAll : Navigate to the Browser");
    page = await browser.newPage();
    console.log('2. beforeAll: Navigating to website');
    await page.goto("https://www.stadsolution.com/automation-testing-practice/");
    console.log('3. beforeAll: Website opened successfully');
// Create test log file
        const fs = await import('node:fs/promises');
        await fs.writeFile("test-log.txt", "Form testing started");
});
test("Fill fullname, email and take screenshot", async() => {
    await page.getByRole("textbox", {name : "e.g. Rahul Sharma"}).fill("Devanshi QA");
    await page.getByRole("textbox", {name : "rahul@example.com"}).fill("devanshi@gmail.com");
//take screenshot
    await page.screenshot({path: "Name-email-filling-screenshot.png", fullPage:true})
});
test("Fill phone and address and taking screenshot" , async() =>{
    await page.locator("#f-phone").fill("9876541230");
    await page.getByPlaceholder("Enter full address...").fill("Althan, surat");
    await page.screenshot({path: "Phone-address-screenshot.png", fullPage:true});
});
test.afterAll(async() => {
    console.log("5. afterAll: Starting cleanup");

        await unlink("Name-email-filling-screenshot.png");
        await unlink("Phone-address-screenshot.png");
    // Verify screenshots are deleted
        const fs = await import('node:fs/promises');
        await expect(fs.access("Name-email-filling-screenshot.png").then(() => true, () => false)).resolves.toBe(false);
        await expect(fs.access("Phone-address-screenshot.png").then(() => true, () => false)).resolves.toBe(false);

        console.log("6. Cleanup successful: Both screenshots deleted");
        await page.close();
        console.log("7. Browser page closed");
});
});

/*Q3: beforeEach - Fresh setup Before every test
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: GUI Form Elements (Section 1)
Real-World Scenario:
You are testing a form with multiple test cases. Each test must start
with a FRESH, clean form — no leftover data from the previous test.
beforeEach navigates to the page and resets the form before every
single test, ensuring complete test isolation.
Task:
- Use test.beforeEach() to navigate to the page fresh before each test
- Write 3 tests that each fill different form field combinations:
Test 1: Fill Name only → assert value
Test 2: Fill Email only → assert value
Test 3: Fill Name + Email + Phone → assert all values
- Show that each test starts with an empty form (no data from prev test)
- Use test.afterEach() to log which test just completed*/

test.describe("beforeEach - Fresh setup Before every test" ,()  => {
    test.beforeEach(async({page}) => {
        await page.goto("https://www.stadsolution.com/automation-testing-practice/");
        console.log("beforeEach: Website opened successfully");
    });
//Test 1:
    test("Fill Name only and assert value", async({page}) => {
        const validatename = page.getByRole("textbox", {name : "e.g. Rahul Sharma"});
        await expect(validatename).toHaveValue("");
        await validatename.fill("Devanshi QA");
        await expect(validatename).toHaveValue("Devanshi QA")
        console.log("Fill name test completed and verified");
    });
//Test 2:
    test("Fill Email only and assert value", async({page}) => {
        const validateemail = page.getByRole("textbox", {name : "rahul@example.com"});
        await expect(validateemail).toHaveValue("");
        await validateemail.fill("devanshi123@gmail.com");
        await expect(validateemail).toHaveValue("devanshi123@gmail.com");
        console.log("Fill email test completed and verified");
});
//Test 3:
    test("Fill Name and email and assert value", async({page}) => {
        const validatename = page.getByRole("textbox", {name : "e.g. Rahul Sharma"});
        const validateemail = page.getByRole("textbox", {name : "rahul@example.com"});
         const validatephone = page.locator("#f-phone");
         // Verify fresh empty form
        await expect(validatename).toHaveValue("");
        await expect(validateemail).toHaveValue("");
        await expect(validatephone).toHaveValue("");
        await validatename.fill("Devanshi QA");
        await validateemail.fill("devanshi123@gmail.com");
        await validatephone.fill("9876541230");       
        await expect(validatename).toHaveValue("Devanshi QA");
        await expect(validateemail).toHaveValue("devanshi123@gmail.com");
        await expect(validatephone).toHaveValue("9876541230");
        console.log("Name, Email and Phone test completed and verified");
    });
    test.afterEach(async({ }, testInfo) => {
        console.log(`${testInfo.title} completed`);
    });
});

/*Q4: afterEach - Cleanup and screenshot on failure After Every Test
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: Alerts & Popups (Section 8)
Real-World Scenario:
In a real CI/CD pipeline, when a test fails you need evidence of WHAT
went wrong. afterEach automatically takes a screenshot after every test.
If the test passed, the screenshot is deleted to save storage. If the
test failed, the screenshot is kept as evidence for the bug report.
Task:
- Use test.beforeEach() to navigate to the page before each test
- Write 3 tests:
Test 1: Assert Simple Alert button visible (will PASS)
Test 2: Assert Confirm Alert button visible (will PASS)
Test 3: Intentionally wrong assertion (will FAIL) to demo screenshot
- Use test.afterEach() to:
• Always take a screenshot after every test
• Delete the screenshot if test PASSED
• Keep the screenshot if test FAILED (evidence)
• Print the test result and screenshot action taken*/

test.describe("beforeEach - Fresh setup Before every test" , () => {
    test.beforeEach(async({page}) => {
        await page.goto("https://www.stadsolution.com/automation-testing-practice/");
        await page.getByRole("heading" , {name: "Alerts & Popups"}).scrollIntoViewIfNeeded();

    console.log("beforeEach: Website opened successfully");
    });

//Test 1 :
    test("Assert Simple Alert button visible (will PASS)", async({page}) => {
        const simplebuttomn = page.getByRole("button" , {name: ' Simple Alert'})
        await expect(simplebuttomn).toBeVisible();
    });

//Test 2
    test("Assert Confirm Alert button visible (will PASS)", async({page}) => {
        const confirmAlert = page.getByRole("button" , {name: " Confirm Alert"});
        await expect(confirmAlert).toBeVisible();
    });

//Test 3 
test("Intentionally failing test for screenshot demo", async ({ page }) => {
        const simplebutton = page.getByRole("button", {name: "Wrong Alert Button"});
        await expect(simplebutton).toBeVisible();
    });

// afterEach: Screenshot and cleanup
    test.afterEach(async ({page}, testInfo) => {
        const screenshotPath = `screenshot/${testInfo.title.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
//always take screenshot
        await page.screenshot({path:screenshotPath,fullPage:true});
        console.log(`Test status : ${testInfo.status}`);
          if (testInfo.status === 'passed'){
          await fs.unlink(screenshotPath);
          console.log("Test PASSED: Screenshot deleted");
   } else{
    // Keep screenshot if test failed
           console.log(`Test FAILED: Screenshot retained at ${screenshotPath}`);
   };       
    });
});