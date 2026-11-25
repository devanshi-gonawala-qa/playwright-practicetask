import {test, expect} from '@playwright/test';
/* Q1: nth() locator - click 2nd Product
Website: https://www.automationexercise.com/products
Page: All Products
Task:
- Open the All Products page
- Locate all product cards on the page
- Use nth(1) to target the 2nd product card
- Click the 'View Product' link inside the 2nd product
- Assert the URL contains '/product_details/2' (Men Tshirt)
- Print the current URL after navigation*/
test("Click 2nd product using nth() locator task", async({page}) => {
    await page.goto("https://www.automationexercise.com/products")
    const allproducts = page.locator("div[class = 'product-image-wrapper']");
    await allproducts.nth(1).getByRole("link" , {name: "View Product"}).click();
    await expect(page).toHaveURL(/product_details\/2/);
    console.log("Current Page URL is : " + page.url());
    // await page.waitForTimeout(2000)
});

/*Q2: First() and last() click of product
Website: https://www.automationexercise.com/products
Page: All Products
Task:
- Open the All Products page
- Use first() to get the first product and print its name
- Use last() to get the last product and print its name
- Assert first product name contains 'Blue Top'
- Assert last product name contains 'GRAPHIC DESIGN'*/

test("First and last product click", async({page}) => {
    await page.goto("https://www.automationexercise.com/products");
    const allproducts = page.locator("div[class = 'product-overlay']")
    const firstproduct = allproducts.first();
    const nameoffirstproduct = await firstproduct.innerText();
    console.log("First product name is: " + nameoffirstproduct);
    await expect(firstproduct).toContainText("Blue Top");
    const lastproduct = allproducts.last();
    const nameoflastproduct = await lastproduct.innerText();
    console.log("Last product name is: " + nameoflastproduct);
    await expect(lastproduct).toContainText("GRAPHIC DESIGN")
});

/*Q3: hastext() - find blue top and click view product
Website: https://www.automationexercise.com/products
Page: All Products
Product: Blue Top
Task:
- Open the All Products page
- Use locator with hasText() to find the product card containing 'Blue Top'
- Click the 'View Product' link inside that specific card
- Assert the URL contains '/product_details/1'*/

test("Find 'Blue Top and click view product" , async({page}) => {
    await page.goto("https://www.automationexercise.com/products")
    const bluetopproduct = page.locator("div.product-image-wrapper").filter({hasText: 'Blue Top'});
    await bluetopproduct.getByRole("link", {name: "View Product"}).click();
    await expect(page).toHaveURL(/product_details\/1/);    
});

/* Q4: filter({visible:true}) - count visible products
Website: https://www.automationexercise.com/products
Page: All Products
Task:
- Open the All Products page
- Locate all product cards
- Filter only the visible product cards using filter({ visible: true })
- Print the count of visible products
- Assert the visible count is greater than 0*/
test("Count visible products", async({page}) => {
    await page.goto("https://www.automationexercise.com/product")
    const allproducts = page.locator("div.product-image-wrapper").filter({visible:true});
    const countofproducts = await allproducts.count()
    console.log("Visible products are: " + countofproducts);
    await expect(countofproducts).toBeGreaterThan(0);
    // await page.waitForTimeout(2000);
});

/*Q5: Multiple elements loop- click First 3 Add to cart buttons
Website: https://www.automationexercise.com/products
Page: All Products
Field: Add to Cart buttons
Task:
- Open the All Products page
- Locate all 'Add to cart' buttons in product info sections
- Use a loop to click the first 3 buttons one by one
- After each click, close the cart popup (Continue Shopping)
- Print which product was added each time*/

test("Multiple elements loop - click First 3 Add to cart buttons", async ({ page }) => {

    await page.goto("https://www.automationexercise.com/products");
    const allproducts = page.locator(".productinfo");
    for (let i = 0; i <  3; i++){
        const product = allproducts.nth(i);
        const productname = await product.locator("p").innerText();
        await product.locator("a.add-to-cart").click();
        console.log("Product name is: "+ productname);
        await page.getByRole("button" , {name: "Continue Shopping"}).click();
}});
