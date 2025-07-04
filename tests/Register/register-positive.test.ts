import { test } from '../../fixtures/pom-fixture';
// import { HomePage } from '../../pages/HomePage';
// import { RegisterPage } from '../../pages/RegisterPage';


test.describe("Register Positive Scenario", async () => {

    test("TC001 - Regsiter with valid cred", async ({ homePage, registerPage }) => {
        
        // await homePage.naviagteToApp();
        await homePage.navigateToRegisterPage();
        await registerPage.enterUserDetails("Pankaj", "Surya", "pankaj@gmail.com", "7738633671", "pankaj@12345");
        await registerPage.subscribeToNewsletter(true);
        await registerPage.submit(true);
    })

});