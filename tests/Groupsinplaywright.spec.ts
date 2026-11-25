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

test.describe("Static Web Table Tests", () => {
    test.beforeEach(async({page}) => {
        await page.goto("https://www.stadsolution.com/automation-testing-practice/");
        await page.getByRole("heading" , {name: "Static Web Table"}).scrollIntoViewIfNeeded();
        console.log("beforeEach: Website opened successfully");
    });

//Test 1: 
test("Assert table heading 'Static Web Table' is visible", async({page}) => {
    await expect(page.getByRole("heading", {name: "Static Web Table"})).toBeVisible();
});
//Test 2:
test("Verify table has 6 rows of student data", async({page}) => {
    console.log("Test 2: Checking student table rows");
    const table = page.getByRole("heading", {name: "Static Web Table"}).locator("xpath=following::table[1]");
    const rows = table.locator("tbody tr");
    await expect(rows).toHaveCount(6);
    });

//Test 3: 
test("Assert first student name is 'Arjun Mehta'", async({page}) => {
    console.log("Test 3: Checking first student name");
    const table = page.getByRole("heading", {name: "Static Web Table"}).locator("xpath=following::table[1]");
    const firstStudent = table.locator("tbody tr").first();
    await expect(firstStudent).toContainText("Arjun Mehta"); 
});

//Test 4:
    test("Assert last student's course is Mobile Testing", async ({ page }) => {
        console.log("Test 4: Checking last student's course");
        const table = page.getByRole("heading", {name: "Static Web Table"}).locator("xpath=following::table[1]");
        const lastStudent = table.locator("tbody tr").last();
        await expect(lastStudent).toContainText("Mobile Testing");
    });
});

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

/*Q3: Hooks - inside groups - Scope and Excuation of beforeAll , afterAll, beforeEach, afterEach
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Sections: GUI Form (Section 1), Mouse Hover (Section 9)
Real-World Scenario:
You have two test groups. Group 1 tests the GUI Form and Group 2 tests
the Hover Dropdown. Each group needs different setup and teardown.
Demonstrate that hooks inside a group are SCOPED to that group only —
Group 1 hooks do NOT affect Group 2 tests, and vice versa.
Task:
- Create Group 1 'GUI Form Tests' with:
beforeAll — log group start
afterAll — log group end
beforeEach — navigate and log
afterEach — log test result
Test 1: Full Name field visible
Test 2: Email field visible
- Create Group 2 'Hover Dropdown Tests' with:
beforeAll — log group start
afterAll — log group end
beforeEach — navigate and log
Test 3: Mobiles button visible
Test 4: Laptops button visible
- Prove via console logs that Group 1 hooks never fire during Group 2 tests*/

const url = "https://www.stadsolution.com/automation-testing-practice/";

// GROUP 1: GUI Form Tests
test.describe("GUI Form Tests", () => {

    test.beforeAll(async ({}, workerInfo) => {
        console.log("GROUP 1 START: GUI Form Tests");
        console.log(`Worker #${workerInfo.workerIndex} started`);
    });

    test.beforeEach(async ({ page }) => {
        console.log("GROUP 1 beforeEach: Navigating to GUI Form");
        await page.goto(url);
    });

    test.afterEach(async ({}, testInfo) => {
        console.log(`GROUP 1 afterEach: "${testInfo.title}" -> ${testInfo.status}`);
    });

    test.afterAll(async () => {
        console.log("GROUP 1 END: GUI Form Tests");
    });

    test("Test 1: Full Name field visible", async ({ page }) => {
        console.log("GROUP 1 - Test 1: Checking Full Name");

        const fullname = page.getByRole("textbox", {
            name: "e.g. Rahul Sharma"
        });

        await expect(fullname).toBeVisible();
    });

    test("Test 2: Email field visible", async ({ page }) => {
        console.log("GROUP 1 - Test 2: Checking Email");

        const email = page.getByRole("textbox", {
            name: "rahul@example.com"
        });

        await expect(email).toBeVisible();
    });
});

// GROUP 2: Hover Dropdown Tests
test.describe("Hover Dropdown Tests", () => {

    test.beforeAll(async ({}, workerInfo) => {
        console.log("GROUP 2 START: Hover Dropdown Tests");
        console.log(`Worker #${workerInfo.workerIndex} started`);
    });

    test.beforeEach(async ({ page }) => {
        console.log("GROUP 2 beforeEach: Navigating to Hover Dropdown");
        await page.goto(url);
    });

    test.afterAll(async () => {
        console.log("GROUP 2 END: Hover Dropdown Tests");
    });

    test("Test 3: Mobiles button visible", async ({ page }) => {
        console.log("GROUP 2 - Test 3: Checking Mobiles button");

        const mobiles = page.getByRole("button", {
            name: "Mobiles"
        });

        await expect(mobiles).toBeVisible();
    });

    test("Test 4: Laptops button visible", async ({ page }) => {
        console.log("GROUP 2 - Test 4: Checking Laptops button");

        const laptops = page.getByRole("button", {
            name: "Laptops"
        });

        await expect(laptops).toBeVisible();
    });
});

/*Q4: Running specific Group - test.describe.only()
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Sections: Static Table (Section 3), Alert Section (Section 8), Tabs (Section 6)
Real-World Scenario:
You have 3 test groups in a file. During development, you are fixing
a bug in the Alerts section only. You want to run ONLY the Alert group
without waiting for Table and Tabs groups to execute. Use
test.describe.only() to isolate and run just the Alert group.
Task:
- Create 3 describe groups: 'Table Group', 'Alert Group', 'Tabs Group'
- Apply test.describe.only() on 'Alert Group'
- Table Group: 2 tests (table heading visible, row count)
- Alert Group (only): 3 tests (Simple, Confirm, Prompt buttons visible)
- Tabs Group: 2 tests (tab heading visible, first tab content visible)
- Show clearly in comments why Table and Tabs groups are SKIPPED
- Demonstrate both test.only() and test.describe.only() usage*/

const url4 = "https://www.stadsolution.com/automation-testing-practice/";
// GROUP 1: Table Group
test.describe("Table Group", () => {

// SKIPPED because Alert Group uses test.describe.only()
    test("Test 1: Table heading visible", async ({ page }) => {
        await page.goto(url4);

        const heading = page.getByText("Static Table", {
            exact: true
        });

        await expect(heading).toBeVisible();
    });

// SKIPPED because Alert Group uses test.describe.only()
    test("Test 2: Verify table row count", async ({ page }) => {
        await page.goto(url4);

        const rows = page.locator("table tbody tr");

        await expect(rows).toHaveCount(4);
    });
});

// GROUP 2: Alert Group
// ONLY THIS GROUP WILL EXECUTE
test.describe.only("Alert Group", () => {

    test("Test 3: Simple Alert button visible", async ({ page }) => {
        await page.goto(url4);

        const simple = page.getByRole("button", {
            name: /simple alert/i
        });

        await expect(simple).toBeVisible();
    });

    test("Test 4: Confirm Alert button visible", async ({ page }) => {
        await page.goto(url4);

        const confirm = page.getByRole("button", {
            name: /confirm alert/i
        });

        await expect(confirm).toBeVisible();
    });

    test("Test 5: Prompt Alert button visible", async ({ page }) => {
        await page.goto(url4);

        const prompt = page.getByRole("button", {
            name: /prompt alert/i
        });

        await expect(prompt).toBeVisible();
    });
});

// GROUP 3: Tabs Group
test.describe("Tabs Group", () => {

// SKIPPED because Alert Group uses test.describe.only()
    test("Test 6: Tabs heading visible", async ({ page }) => {
        await page.goto(url4);

        const heading = page.getByText("Tabs", {
            exact: true
        });

        await expect(heading).toBeVisible();
    });

// SKIPPED because Alert Group uses test.describe.only()
    test("Test 7: First tab content visible", async ({ page }) => {
        await page.goto(url4);

        // Replace with the actual first tab content locator
        const firstTab = page.locator('[role="tabpanel"]').first();

        await expect(firstTab).toBeVisible();
    });
});

/*Q5: Skipping group - test.describe.skip() and test.skip()
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Sections: Dynamic Table (Section 4), Range Slider (Section 12), Labels (Section 14)
Real-World Scenario:
You have 3 test groups. The Dynamic Table feature is under development
and its tests fail. The Slider tests are blocked pending a bug fix.
You want to SKIP these two groups entirely so CI/CD stays green while
the Labels group continues to run normally. Use test.describe.skip()
and test.skip() with reasons to document WHY each is skipped.
Task:
- Create 3 groups:
Group 1 'Dynamic Table Tests' — skip entire group (feature in dev)
Group 2 'Slider Tests' — skip 1 test inside the group (bug pending)
Group 3 'Labels Tests' — runs normally, 3 tests
- For every skip add a reason string explaining WHY
- Demonstrate test.describe.skip(), test.skip() inside a test, and
conditional test.skip() based on a condition*/

const url5 = "https://www.stadsolution.com/automation-testing-practice/";

// GROUP 1: Dynamic Table Tests
// Entire group is skipped because the feature is still under development.

test.describe.skip("Dynamic Table Tests", () => {

    test("Test 1: Dynamic table heading visible", async ({ page }) => {
        await page.goto(url5);

        const heading = page.getByText("Dynamic Table", {
            exact: true
        });

        await expect(heading).toBeVisible();
    });

    test("Test 2: Dynamic table rows visible", async ({ page }) => {
        await page.goto(url5);

        const rows = page.locator("table tbody tr");

        await expect(rows.first()).toBeVisible();
    });
});

// GROUP 2: Slider Tests
// Group executes, but one test is skipped because of a pending bug.
test.describe("Slider Tests", () => {

    test("Test 3: Slider heading visible", async ({ page }) => {
        await page.goto(url5);

        const heading = page.getByText("Range Slider", {
            exact: true
        });

        await expect(heading).toBeVisible();
    });

    test("Test 4: Verify slider functionality", async ({ page }) => {

// Skip this test because slider functionality has a pending bug.
        test.skip(true, "Skipped: Slider functionality bug is pending fix.");

        await page.goto(url5);

        const slider = page.locator('input[type="range"]');

        await expect(slider).toBeVisible();
    });

});

// GROUP 3: Labels Tests
// This group runs normally.

test.describe("Labels Tests", () => {

    test("Test 5: Labels heading visible", async ({ page }) => {
        await page.goto(url5);

        const heading = page.getByText("Labels", {
            exact: true
        });

        await expect(heading).toBeVisible();
    });

    test("Test 6: First label visible", async ({ page }) => {
        await page.goto(url5);

        const label = page.locator("label").first();

        await expect(label).toBeVisible();
    });

    test("Test 7: Labels section contains labels", async ({ page }) => {
        await page.goto(url5);

        const labels = page.locator("label");

        await expect(labels.first()).toBeVisible();
        await expect(labels).not.toHaveCount(0);
    });

});

// CONDITIONAL SKIP EXAMPLE
test.describe("Conditional Skip Tests", () => {

    test("Test 8: Skip based on browser condition", async ({ page, browserName }) => {

// Skip this test only when running on Firefox.
        test.skip(
            browserName === "firefox",
            "Skipped: This feature is currently not supported in Firefox."
        );

        await page.goto(url5);

        const heading = page.getByText("Labels", {
            exact: true
        });
        await expect(heading).toBeVisible();
    });
});



        

    