import {test} from '@playwright/test'
test("full account information task", async({page}) => {
   await page.goto("https://www.automationexercise.com/login");
   await page.getByRole("textbox" , {name: "name"}).fill("Devanshi")
   await page.getByRole("textbox", {name: "Email Address"}).nth(1).fill("devanshi@testing.com");
   await page.getByRole("button", {name: "Signup"}).click();
   // await page.waitForTimeout(1000)
   await page.getByRole("textbox" , {name: "password"}).fill("testing1234")
   await page.getByRole("textbox", {name: "First name *"}).fill("Devanshi");
   await page.getByRole("textbox", {name : "Last name *"}).fill("Gonawala");
   await page.getByRole("textbox", {name: "Address *"}).fill("Surat");
   await page.getByRole("textbox", {name: "Address 2"}).fill("Surat");
   await page.getByRole("textbox", {name : "State *"}).fill("Gujarat");
   await page.getByRole("textbox", {name : "City *"}).fill("Surat");
   await page.locator('[name="zipcode"]').fill("123654");
   await page.getByRole("textbox", {name : "Mobile number *"}).fill("9876543210");
   // await page.waitForTimeout(2000);

   // Validate field values
   let password = await page.getByRole("textbox" , {name: "password"}).inputValue();
   let firstname = await page.getByRole("textbox", { name: "First name *" }).inputValue();
   let lastname = await page.getByRole("textbox", {name: "Last name *"}).inputValue();
   let address = await page.getByRole("textbox", {name:"Address *"}).inputValue();
   let address1 = await page.getByRole("textbox", {name:"Address *"}).inputValue();
   let state = await page.getByRole("textbox", {name : "State *"}).inputValue();
   let city = await page.getByRole("textbox", {name : "City *"}).inputValue();
   let zipcode = await page.locator('[name="zipcode"]').inputValue();
   let mobilenumber = await page.getByRole("textbox", {name : "Mobile number *"}).inputValue();

   console.log("Password: ", password);
   console.log("firstname: ", firstname);
   console.log("lastname: ",lastname);
   console.log("Address: ", address);
   console.log("Address1: ", address1);
   console.log("State: ", state);
   console.log("City: ", city);
   console.log("Zipcode: ", zipcode);
   console.log("Mobie number: ", mobilenumber);
});   