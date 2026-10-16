export class LoginPage{

    constructor(page){
        this.page = page;
        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.btnLogin = page.locator('#login');
    };

    async abrir_url() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    };

    async efetuar_login(username , password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.btnLogin.click();
    };

};