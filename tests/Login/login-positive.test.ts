import test from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";


test.describe("Login Positive Scenario", async () => {


    test("TC101 - Login with valid Credentials", async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToLoginPage();

        const loginPage = new LoginPage(page);
        await loginPage.loginToApp("djdjd@gmail.com", "qY4f!gu8QmN2prq");
    })

})