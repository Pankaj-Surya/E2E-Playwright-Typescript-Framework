import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe("Register Scenario", {
    annotation: {
        type: "Test Scenario - Register",
        description: "link to JIRA/Azure Devops"
    },
    tag: "@smoke"
}, async () => {

    test("TC01 - Register with Valid Credentails", async ({ page }) => {

        await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");

        const homePage = new HomePage(page);
        await homePage.navigateToRegister();

        await page.waitForTimeout(3000);

    })

})