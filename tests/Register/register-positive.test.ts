import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { RegisterPage } from '../../pages/RegisterPage';


test.describe("Register Positive Scenario", async () => {

    test("TC001 - Regsiter with valid cred", async ({ page }) => {
        const homePage = new HomePage(page);
        const registerPage = new RegisterPage(page);
        // await homePage.naviagteToApp();
        await homePage.navigateToRegisterPage();
        await registerPage.enterUserDetails("Pankaj", "Surya", "pankaj@gmail.com", "7738633671", "pankaj@12345");
        await registerPage.subscribeToNewsletter(true);
        await registerPage.submit(true);
    })

});