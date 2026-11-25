import {test,expect} from '@playwright/test';
import fs from 'fs';
/*Q1: Upload single File
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: File Upload (Section 2)
Field: Single File upload input
Task:
- Open the website
- Scroll to Section 2 (File Upload)
- Create a temporary test file to upload
- Locate the Single File input using its label
- Upload the file using setInputFiles()
- Read the uploaded file name from the input
- Assert the file name matches the uploaded file*/

test("Upload Single File", async({page}) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/");
    await page.getByRole("heading", {name: 'File Upload'}).scrollIntoViewIfNeeded();
    // create a temporary file
    fs.writeFileSync("C:/Users/LENOVO/Desktop/temperoryfile11.txt", "This is my test file");
    const fileupload = page.locator("input[type='file']").first();
    await fileupload.setInputFiles("C:/Users/LENOVO/Desktop/temperoryfile11.txt");
    await expect(fileupload).toHaveValue("C:\\fakepath\\temperoryfile11.txt");
});

/*Q2: Upload multiple files
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: File Upload (Section 2)
Field: Multiple Files upload input
Task:
- Open the website
- Scroll to Section 2 (File Upload)
- Create 3 temporary test files of different types (.txt, .csv, .json)
- Locate the Multiple Files input using its multiple attribute
- Upload all 3 files at once using setInputFiles([array])
- Read all uploaded file names, sizes, and types from the input
- Assert all 3 files are uploaded and count is correct*/

test("Upload multiple files", async ({ page }) => {

    await page.goto("https://www.stadsolution.com/automation-testing-practice/");

    // Scroll to File Upload section
    await page.getByRole("heading", { name: "File Upload" }).scrollIntoViewIfNeeded();

    // Create 3 temporary files
    fs.writeFileSync("file1.txt", "Hello Playwright");
    fs.writeFileSync("file2.csv", "Name,Age\nRahul,25");
    fs.writeFileSync("file3.json", '{"name":"Rahul"}');

    // Locate multiple file upload input
    const fileupload = page.locator("input[type='file'][multiple]");

    // Upload all 3 files
    await fileupload.setInputFiles([
        "file1.txt",
        "file2.csv",
        "file3.json"
    ]);

    // Read uploaded file names
    const fileNames = await fileupload.evaluate(input =>
        Array.from((input as HTMLInputElement).files || []).map(file => file.name)
    );

    // Verify file names
    expect(fileNames).toContain("file1.txt");
    expect(fileNames).toContain("file2.csv");
    expect(fileNames).toContain("file3.json");

    // Verify total file count
    expect(fileNames.length).toBe(3);

    console.log(fileNames);
});

/*Q3: Download file with Server File Name and Q4: Fetch download path and validate file
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Task:
- Open the website
- Trigger a file download by clicking a download link
- Capture the Download event using page.waitForEvent('download')
- Read the suggested file name given by the server
- Save the file to a specific downloads folder
- Assert the downloaded file name is not empty
- Assert the saved file exists on disk with content*/
test("Download file with Server File Name", async ({ page }) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/");
    const downloadLink = page.getByRole('link', {
        name: 'Download File'
    });
    if (await downloadLink.count() === 0) {
        console.log("Download option is not provided on this website. Skipping this task.");
        test.skip();
    }
});

/*Q5: Remove uploaded file from Input
Website: https://www.stadsolution.com/automation-testing-practice/
Page: Automation Testing Practice
Section: File Upload (Section 2)
Field: Single File upload input
Task:
- Open the website and create two test files
- Upload the first file — assert file count = 1
- Remove the file using setInputFiles([]) — assert file count = 0
- Re-upload a different file — assert new file name is correct
- Assert old file name is gone after re-upload*/
test("Remove uploaded file from Input" , async({page}) => {
    await page.goto("https://www.stadsolution.com/automation-testing-practice/")
    await page.getByRole("heading", {name: 'File Upload'}).scrollIntoViewIfNeeded();
    const fileupload = page.locator("input[type='file']").first();
    await fileupload.setInputFiles("C:/Users/LENOVO/Desktop/temperoryfile.txt");
    // Verify first file uploaded
    await expect(fileupload).toHaveValue(/temperoryfile\.txt/);
    //remove uploaded file
    await fileupload.setInputFiles([]);
    await expect(fileupload).toHaveValue("");
    await fileupload.setInputFiles("C:/Users/LENOVO/Desktop/temperoryfile11.txt");
    await expect(fileupload).toHaveValue(/temperoryfile11\.txt/);
    await expect(fileupload).not.toHaveValue(/temperoryfile\.txt/);
});
