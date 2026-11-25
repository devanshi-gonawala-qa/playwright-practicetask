import {test, expect} from '@playwright/test';
/*Q1: Double click - copy text from feild 1 and field 2
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: Double Click (Section 10)
Fields: Field 1 (Source), Field 2 (Target read-only), '👆 Double Click Me' button
Task:
- Open the website
- Scroll to Section 10 (Double Click)
- Read the current text in Field 1
- Double-click the '👆 Double Click Me' button
- After double-click, read the value of Field 2 (Target)
- Assert Field 2 now contains the same text as Field 1*/
// test("Double click - copy text", async ({ page }) => {

//     await page.goto("https://www.stadsolution.com/automation-testing-practice/");
//     const fields = page.getByRole("textbox");
//     const field1 = fields.nth(10);
//     const field2 = fields.nth(11);
//     const text1 = await field1.inputValue();
//     const button = page.getByRole("button", { name: "Double Click Me" });
//     await button.scrollIntoViewIfNeeded();
//     await button.dblclick();
//     const text2 = await field2.inputValue();
//     expect(text2).toBe(text1);
// });
// or q1 answer
/*test("Double click - copy text from field 1 and field 2", async({page}) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/");
    // Locate Section 10
    const section = page.locator("section").filter({
        has: page.getByRole("heading", {name: "Double Click"})
    });
    await section.scrollIntoViewIfNeeded();
    // Locate both textboxes
    const fields = section.getByRole("textbox");
    const field1 = await fields.nth(0).inputValue();
    // Double-click
    await section.getByRole("button", {name: "Double Click Me"}).dblclick();
    const field2 = await fields.nth(1).inputValue();
    // Assertion
    await expect(fields.nth(1)).toHaveValue(field1);
});*/

/*Q2: Hover - Reveal Dropdown menu or mouse over
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: Mouse Hover Dropdown (Section 9)
Field: '📱 Mobiles ▾' hover button and its dropdown items
Task:
- Open the website
- Scroll to Section 9 (Mouse Hover Dropdown)
- Hover over the '📱 Mobiles ▾' button
- Assert the dropdown menu becomes visible after hover
- Read and print all dropdown item names
- Click 'Samsung' from the revealed dropdown*/
// test("Hover - Reveal Dropdown menu or mouse over", async({page}) => {
//     await page.goto("https://www.stadsolution.com/automation-testing-practice/");
//     const mousebutton = page.getByRole("button");
//     const mouse = page.getByRole("button" , {name : " Mobiles ▾"});
//     await mousebutton.nth(9).scrollIntoViewIfNeeded();
//     await mouse.hover();
//     const dropdown = page.getByRole("link", {name: /Samsung|Apple|OnePlus|Xiaomi/});
//     await expect(dropdown.first()).toBeVisible();
//     const items = await dropdown.allTextContents();
//     console.log(items);
//     await page.getByRole("link" , {name: /Samsung/}).click();
//     // await page.waitForTimeout(2000)
// });

/*Q3: Keyboard press -  Tab Navigation and enter key
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: GUI Form Elements (Section 1)
Fields: Full Name, Email Address inputs
Task:
- Open the website
- Click on the Full Name input field
- Type a name using keyboard
- Press Tab key to move focus to the Email field
- Type an email using keyboard
- Press Tab again to move to the next field
- Press Escape key to cancel any open dropdown
- Assert values are correctly entered in both fields*/
// test("Keyboard press -  Tab Navigation and enter key", async({page}) => {
//     await page.goto("https://www.stadsolution.com/automation-testing-practice/");
//     const typename = page.getByRole("textbox", {name : "e.g. Rahul Sharma"})
//     await typename.click();
//     await typename.pressSequentially("Devanshi QA");
//     await page.keyboard.press("Tab");
//     const emailtype = page.getByRole("textbox", {name : "rahul@example.com"})
//     //verify focus in email feild
//     await expect(emailtype).toBeFocused();
//     await emailtype.pressSequentially("devanshi@gmail.com");
//     await emailtype.press("Tab");
//     await page.keyboard.press("Escape");
//     await expect(typename).toHaveValue("Devanshi QA");
//     await expect(emailtype).toHaveValue("devanshi@gmail.com")
//     await page.waitForTimeout(2000);
// });

/*Q4: Scroll - navigate to section and verify visibility
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Sections: Range Slider (Section 12), Drag and Drop (Section 11)
Task:
- Open the website
- Scroll down to the Range Slider section (Section 12)
- Assert the Range Slider section heading is visible
- Scroll back up to the top of the page
- Assert the page heading is visible after scrolling back up
- Also demonstrate mouse-wheel scroll using page.mouse.wheel()*/
// test("Scroll - navigate to section and verify visibility", async({page}) => {
//     await page.goto("https://www.stadsolution.com/automation-testing-practice/");
//     const rangeslidersection = page.getByRole("heading", {name : "Range Slider"});
//     await rangeslidersection.scrollIntoViewIfNeeded();
//     await expect(rangeslidersection).toBeVisible();
//     // await page.waitForTimeout(2000)
//     // await page.mouse.wheel(0,-3000)
//     await page.evaluate(() => window.scrollTo(0,0));
//     // await page.waitForTimeout(2000)
//     await expect(page.getByRole("heading", {name : " Practice Automation Testing"})).toBeVisible();
// });

/* Q5: Drag and drop - move source Element to Target     
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: Drag and Drop (Section 11)
Fields: '🧩 Drag Me!' source box, '📦 Drop Here' target box
Task:
- Open the website
- Scroll to the Drag and Drop section
- Read the initial text of the target box
- Drag the source element '🧩 Drag Me!' into the target '📦 Drop Here'
- Assert the target box text changes after the drop
- Click Reset and verify the target returns to original state*/
// test("Drag and drop - move source Element to Target", async({page}) => {
//     await page.goto("https://www.stadsolution.com/automation-testing-practice/");
//     const drageanddrop =  page.getByRole("heading", {name: "Drag and Drop"});
//     await drageanddrop.scrollIntoViewIfNeeded();
//     const drag = page.locator("div[id = 'drag-src']");
//     const drop = page.locator("div[id = 'drag-tgt']");
//     const initaltext = await drop.innerText();
//     console.log("Intial target text is: " + initaltext);
//     await drag.dragTo(drop);
//     await expect (drop).not.toHaveText(initaltext);
//     console.log("Updated text is: "+ await drop.innerText());
//     // await page.waitForTimeout(2000);
//     await page.getByRole("button", {name : "↺ Reset"}).last().click();
//     // await page.waitForTimeout(2000);
//     await expect(drop).toHaveText(initaltext);
// });

/*Q6: Right click- trigger context menu on Element
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: GUI Form Elements (Section 1)
Field: Full Name input
Task:
- Open the website
- Fill the Full Name field with a value
- Right-click on the Full Name input field
- Verify the right-click action was performed on the correct element
- Press Escape to close the context menu
- Assert the field still holds its value after right-click*/
// test("Right click- trigger context menu on Element", async({page}) => {
//     await page.goto("https://www.stadsolution.com/automation-testing-practice/");
//     const fullname = page.getByRole("textbox" , {name: "e.g. Rahul Sharma"})
//     await fullname.fill("Devanshi QA");
//     await fullname.click({button: "right"});
//     await expect(fullname).toBeFocused();
//     await page.keyboard.press("Escape");
//     await expect(fullname).toHaveValue("Devanshi QA");
// });

/*Q7: Range Slider - Set value Using keyboard and mouse
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: Range Slider (Section 12)
Fields: Volume slider
Task:
- Open the website
- Scroll to the Range Slider section (Section 12)
- Read the current value of the Volume slider
- Set the Volume slider to 80 using JavaScript evaluate()
- Verify the new slider value is 80
- Also demonstrate keyboard arrow key interaction on the slider*/
test("Range Slider - Set value Using keyboard and mouse", async({page}) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/");
    const rangeslidersection = page.getByRole("heading", {name : "Range Slider"});
    await rangeslidersection.scrollIntoViewIfNeeded();
    const slider = page.getByRole("slider");
    const currentValue = await slider.inputValue();
    console.log("Current value is: " + currentValue);
    await slider.evaluate((Element) => {
        Element.value = "80"    
    })

})