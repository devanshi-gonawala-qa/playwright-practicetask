import {expect, test} from '@playwright/test';
/*Q1: Select a single Option from Country Dropdown:
Website: https://www.stadsolution.com/automation-testing-practice/
Page: GUI Form Elements (Section 1)
Field: Country dropdown (single select)
Task:
- Open the website
- Select 'India' from the Country dropdown
- Fetch the selected value using inputValue()
- Assert the selected value is 'India'*/
test("Select a option from country dropdown" , async({page}) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/");
    const selectindiaoption = page.locator("select[id= 'f-country']");
    await(selectindiaoption).selectOption({label: "India"})
    const selectedvalue = await selectindiaoption.inputValue();
    console.log("Selected country is : " + selectedvalue)
    await expect(selectindiaoption).toHaveValue("India");
    console.log("India is selected successfully!");    
});

/*Q2: Verify all options in dropdown
Website: https://www.stadsolution.com/automation-testing-practice/
Page: GUI Form Elements (Section 1)
Field: Country dropdown (single select)
Task:
- Open the website
- Fetch all available option texts from the Country dropdown
- Print each option
- Assert the dropdown contains 'India' and 'United States'*/

test("Verify all options in dropdown", async({page}) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/")
    const dropdownoption = page.locator("#f-country");
    const alloptions = await dropdownoption.locator("option").allInnerTexts();
    // also vcan write console.log(alloptions) but in the list also have sopace so trim that space and return proper output
    for (const option of alloptions) {
    console.log(option.trim());
}
    await expect(dropdownoption.locator('option')).toContainText(["India", "United States"]);
});

/* Q3: Select multiple options from testing tools dropdown
Website: https://www.stadsolution.com/automation-testing-practice/
Page: GUI Form Elements (Section 1)
Field: Testing Tools dropdown (multi-select)
Task:
- Open the website
- Select 'Selenium', 'Playwright', and 'Postman' from the Testing Tools multi-select dropdown
- Fetch all selected values
- Assert all three values are selected*/

test(" Select multiple options from testing tools dropdown", async({page}) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/")
    const testingtool = page.locator("select[multiple]").nth(0);
    await testingtool.selectOption([{label: "Selenium"},{label: "Playwright"},{label: "Postman"}])
    const selectedvalue = await testingtool.locator("option:checked").allInnerTexts();
    console.log("Selected Testing Tools:", selectedvalue);
    await expect(testingtool.locator("option:checked")).toHaveText(["Selenium", "Playwright", "Postman"]);
});

/*Q4: Deselected option from multi-selected Dropdown
Website: https://www.stadsolution.com/automation-testing-practice/
Page: GUI Form Elements (Section 1)
Field: Testing Tools dropdown (multi-select)
Task:
- Open the website
- Select 'Selenium', 'Cypress', and 'Playwright' from the Testing Tools multi-select dropdown
- Then deselect 'Cypress' by re-selecting only the remaining options
- Assert only 'Selenium' and 'Playwright' remain selected*/
test("Deselected option from multi-selected Dropdown", async({page}) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/");
    const testingtool = page.locator('select[multiple]').nth(0);
    await testingtool.selectOption([{label:'Selenium'}, {label: 'Cypress'}, {label : 'Playwright'}]);
    // await page.waitForTimeout(2000)  
    await testingtool.selectOption([{label: 'Selenium'} , {label: 'Playwright'}]);
    const selectedOption = await testingtool.locator('option:checked').allTextContents();
    await expect(selectedOption).toEqual(['Selenium', 'Playwright']); 
    // await page.waitForTimeout(2000)  
});

/*Q5: Select All Options from Multi-select and verify count
Website: https://www.stadsolution.com/automation-testing-practice/
Page: GUI Form Elements (Section 1)
Field: Testing Tools dropdown (multi-select)
Task:
- Open the website
- Fetch all available options from the Testing Tools multi-select dropdown
- Select all available options dynamically
- Assert that the number of selected options equals the total number of available options*/
test("Select All Options from Multi-select and verify count", async({page}) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/")
    const testingtool = page.locator('select[multiple]').nth(0);
    await testingtool.allInnerTexts();
    await testingtool.selectOption([{label: 'Selenium'}, {label: 'Cypress'} , {label: 'Playwright'},
        {label: 'Appium'}, {label: 'TestNG'} , {label: 'JUnit'} , {label: 'Postman'}]);
    const selectedoption = await testingtool.locator('option:checked').allTextContents();
    await expect(selectedoption).toEqual(['Selenium', 'Cypress', 'Playwright', 'Appium', 'TestNG','JUnit', 'Postman']);
});