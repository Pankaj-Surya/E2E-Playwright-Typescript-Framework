import { Locator, Page } from "@playwright/test";

export class LoginPage {

    private readonly emailTxtBox: Locator;
    private readonly passwordTxtBox: Locator;
    private readonly loginBtn: Locator;
    private readonly accountHeaderTxt: Locator;

    constructor(private page: Page) {
        this.emailTxtBox = this.page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwordTxtBox = this.page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = this.page.getByRole('button', { name: 'Login' });
        this.accountHeaderTxt = this.page.getByText('Account', { exact: true });
    }

    async loginToApp(email: string, password: string) {
        await this.emailTxtBox.fill(email);
        await this.passwordTxtBox.fill(password);
        await this.loginBtn.click();
        // await this.page.waitForSelector("'Account'");
        await this.accountHeaderTxt.waitFor({ state: "visible", timeout: 3000 });
        await this.page.waitForURL("**/account");
    }

}