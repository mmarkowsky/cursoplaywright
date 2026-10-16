import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashBoardPage } from './pages/DashBoardPage';
import dadosLogin from './massa/login.json' with { type: 'json' };

//test.describe.configure({mode:'parallel'});

for(const dado of dadosLogin){
    test(`@prod validar que a compra foi efetuada com sucesso do produto ${dado.produto}`,async function({page}) {
        const loginPage = new LoginPage(page);
        const dashBoardPage = new DashBoardPage(page);
        
        loginPage.abrir_url();
        loginPage.efetuar_login(dado.username,dado.password);

        await dashBoardPage.adicionar_produto(dado.produto);
        await dashBoardPage.validar_produto_carrinho()
    });
};