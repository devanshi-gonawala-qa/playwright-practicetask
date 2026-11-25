import {test, expect} from '@playwright/test';

/*Q1: Multiple test cases inside a Group - test.describe()
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: Static Web Table (Section 3)Real-World Scenario:
You are testing a student data table. All tests belong to the same
feature — the Static Web Table. Group them together using test.describe()
so they are logically organised, share a common setup, and appear
as one unit in the test report.
Task:
- Create a test.describe() group named 'Static Web Table Tests'
- Add a beforeEach() inside the group to navigate to the page
- Write 4 tests inside the group:
Test 1: Assert table heading 'Static Web Table' is visible
Test 2: Assert table has exactly 6 rows of student data
Test 3: Assert first student name is 'Arjun Mehta'
Test 4: Assert last student's course is 'Mobile Testing'
- Print the group label and each test name in console logs*/

// test.describe("Static Web Table Tests", () => {
//     test.beforeEach(async({page}) => {
//         await page.goto("https://www.stadsolution.com/automation-testing-practice/");
//         await page.getByRole("heading" , {name: "Static Web Table"}).scrollIntoViewIfNeeded();
//         console.log("beforeEach: Website opened successfully");
//     });

// //Test 1: 
// test("Assert table heading 'Static Web Table' is visible", async({page}) => {
//     await expect(page.getByRole("heading", {name: "Static Web Table"})).toBeVisible();
// });
// //Test 2:
// test("Verify table has 6 rows of student data", async({page}) => {
//     console.log("Test 2: Checking student table rows");
//     const table = page.getByRole("heading", {name: "Static Web Table"}).locator("xpath=following::table[1]");
//     const rows = table.locator("tbody tr");
//     await expect(rows).toHaveCount(6);
//     });

// //Test 3: 
// test("Assert first student name is 'Arjun Mehta'", async({page}) => {
//     console.log("Test 3: Checking first student name");
//     const table = page.getByRole("heading", {name: "Static Web Table"}).locator("xpath=following::table[1]");
//     const firstStudent = table.locator("tbody tr").first();
//     await expect(firstStudent).toContainText("Arjun Mehta"); 
// });

// //Test 4:
//     test("Assert last student's course is Mobile Testing", async ({ page }) => {
//         console.log("Test 4: Checking last student's course");
//         const table = page.getByRole("heading", {name: "Static Web Table"}).locator("xpath=following::table[1]");
//         const lastStudent = table.locator("tbody tr").last();
//         await expect(lastStudent).toContainText("Mobile Testing");
//     });
// });

/*Q2: Nested groups - test.describe() inside test.describe()
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Sections: GUI Form (Section 1), Static Table (Section 3), Alerts (Section 8)
Real-World Scenario:
You are testing an entire practice page with multiple feature areas.
Use NESTED test.describe() to mirror the page structure:
Outer group : 'Practice Page Tests' (whole page)
Inner group 1: 'Form Section Tests' (Section 1)
Inner group 2: 'Table Section Tests' (Section 3)
Inner group 3: 'Alert Section Tests' (Section 8)
Each inner group has its own tests and its own beforeEach.
Task:
- Create an outer describe — 'Practice Page'
- Inside it create 3 inner describe blocks
Inner 1 — 'Form Section': 2 tests (page title, Full Name input visible)
Inner 2 — 'Table Section': 2 tests (table visible, row count > 0)
Inner 3 — 'Alert Section': 2 tests (Simple Alert btn, Confirm Alert btn visible)
- Each inner group has its own beforeEach with navigation*/

test.describe("Practice Page Tests", () => {
    console.log(" Practice Page Tests");

// INNER GROUP 1: Form Section
    test.describe("Form Section Tests", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("https://www.stadsolution.com/automation-testing-practice/");
            await page.getByRole("heading", {name: "GUI Form Elements"}).scrollIntoViewIfNeeded();
            console.log("Form Section: beforeEach executed");
        });

// Test 1: Page title
        test("Verify page title", async ({ page }) => {
            console.log("Form Test 1: Checking page title");
            await expect(page).toHaveTitle("Automation Testing Practice - Best Software Testing Training Institute in India | STAD Solution");
        });
// Test 2: Full Name input visible
        test("Verify Full Name input is visible", async ({ page }) => {
            console.log("Form Test 2: Checking Full Name input");
            const fullname = page.getByRole("textbox", {name: "e.g. Rahul Sharma"});
            await expect(fullname).toBeVisible();
        });
    });
// INNER GROUP 2: Table Section
    test.describe("Table Section Tests", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("https://www.stadsolution.com/automation-testing-practice/");
            await page.getByRole("heading", {name: "Static Web Table"}).scrollIntoViewIfNeeded();
            console.log("Table Section: beforeEach executed");
        });
// Test 1: Table visible
        test("Verify Static Web Table is visible", async ({ page }) => {
            console.log("Table Test 1: Checking table visibility");
            const table = page.getByRole("heading", {name: "Static Web Table"}).locator("xpath=following::table[1]");
            await expect(table).toBeVisible();
        });

// Test 2: Row count greater than zero
        test("Verify table has more than zero rows", async ({ page }) => {
            console.log("Table Test 2: Checking row count");
            const table = page.getByRole("heading", {name: "Static Web Table"}).locator("xpath=following::table[1]");
            const rows = table.locator("tbody tr");
            await expect(rows).not.toHaveCount(0);
        });
    });

// INNER GROUP 3: Alert Section
    test.describe("Alert Section Tests", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("https://www.stadsolution.com/automation-testing-practice/");

            await page.getByRole("heading", {name: "Alerts & Popups"}).scrollIntoViewIfNeeded();
            console.log("Alert Section: beforeEach executed");
        });

// Test 1: Simple Alert button
        test("Verify Simple Alert button is visible", async ({ page }) => {
            console.log("Alert Test 1: Checking Simple Alert button");
            const simpleAlert = page.getByRole("button", {name: "Simple Alert"});
            await expect(simpleAlert).toBeVisible();
        });

// Test 2: Confirm Alert button
        test("Verify Confirm Alert button is visible", async ({ page }) => {
            console.log("Alert Test 2: Checking Confirm Alert button");
            const confirmAlert = page.getByRole("button", {name: "Confirm Alert"});
            await expect(confirmAlert).toBeVisible();
        });
    });
});



        

    