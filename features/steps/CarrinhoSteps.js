import { Given,When,Then,After } from "@cucumber/cucumber"

Given('que eu faço o login com o usuario {string} e a senha {string}',async function (username, password) {
    this.loginPage.abrir_url();
    await this.loginPage.efetuar_login(username,password);
});

When('adiciono o produto {string} no carrinho',async function (produto) {
    await this.dashBoardPage.adicionar_produto(produto);
});

Then('valido que o produto foi adicionado no carrinho',async function () {
    await this.dashBoardPage.validar_produto_carrinho()
});