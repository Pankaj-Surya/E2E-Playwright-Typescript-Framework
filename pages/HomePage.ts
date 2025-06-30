import { expect, Locator, Page } from '@playwright/test';

export class HomePage {

    // private page: Page;
    private readonly myAccountBtn: Locator;
    private readonly loginBtn: Locator;
    private readonly registerBtn: Locator;
    private readonly registerTxt: Locator;
    private readonly loginTxt: Locator;

    constructor(private page: Page) {
        this.myAccountBtn = page.getByRole('button', { name: 'My account' });
        this.loginBtn = page.getByRole('link', { name: 'Login' });
        this.registerBtn = page.getByRole('link', { name: 'Register' });
        this.registerTxt = page.getByRole('heading', { name: 'Register Account' });
        this.loginTxt = page.getByRole('heading', { name: 'Returning Customer' });
    }

    private async naviagteToApp() {
        await this.page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");
    }

    async navigateToRegisterPage() {
        await this.naviagteToApp();
        await this.myAccountBtn.hover();
        await this.registerBtn.click();
        //await this.page.waitForURL("**/register");
        await expect(this.registerTxt).toBeVisible();
    }

    async navigateToLoginPage() {
        await this.naviagteToApp();
        await this.myAccountBtn.hover();
        await this.loginBtn.click();
        await this.page.waitForURL("**/login");
        await expect(this.loginTxt).toBeVisible();
    }
}