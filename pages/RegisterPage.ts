import { Locator, Page } from "@playwright/test";

export class RegisterPage {

    //Locator
    private readonly firstnameTxtbox: Locator;
    private readonly lastnameTxtbox: Locator;
    private readonly emailTxtbox: Locator;
    private readonly telephoneTxtbox: Locator;
    private readonly passwordTxtbox: Locator;
    private readonly confirmPasswordTxtbox: Locator;
    private readonly subscribeYesRadioBtn: Locator;
    private readonly subscribeNoRadioBtn: Locator;
    private readonly privacyChkbox: Locator;
    private readonly continueBtn: Locator;

    //Constructor
    constructor(private page: Page) {
        this.firstnameTxtbox = this.page.getByRole('textbox', { name: 'First Name*' })
        this.lastnameTxtbox = this.page.getByRole('textbox', { name: 'Last Name*' });
        this.emailTxtbox = this.page.getByRole('textbox', { name: 'E-Mail*' });
        this.telephoneTxtbox = this.page.getByRole('textbox', { name: 'Telephone*' });
        this.passwordTxtbox = this.page.getByRole('textbox', { name: 'Telephone*' });
        this.confirmPasswordTxtbox = this.page.getByRole('textbox', { name: 'Password Confirm*' });
        this.subscribeYesRadioBtn = this.page.getByText('Yes');
        this.subscribeNoRadioBtn = this.page.getByText('No', { exact: true });
        this.privacyChkbox = this.page.getByText('I have read and agree to the');
        this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
    }

    //Method
    async enterUserDetails(firstname: string, lastname: string, email: string, phone: string, password: string) {
        await this.firstnameTxtbox.fill(firstname);
        await this.lastnameTxtbox.fill(lastname);
        await this.emailTxtbox.fill(email);
        await this.telephoneTxtbox.fill(phone);
        await this.passwordTxtbox.fill(password);
        await this.confirmPasswordTxtbox.fill(password);
    }

    async subscribeToNewsletter(subscribe: boolean) {
        subscribe ? await this.subscribeYesRadioBtn.click() : await this.subscribeNoRadioBtn.click();
    }

    async submit(agree: boolean) {
        agree ? await this.privacyChkbox.click() : '';
        await this.continueBtn.click();

    }





}