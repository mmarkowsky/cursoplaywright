import { expect } from '@playwright/test';

export class DashBoardPage{

    constructor(page){
        this.page = page;
        this.lstProdutos = page.locator(".card-body")
        this.btnAddCart = page.locator('//div[@aria-label="Product Added To Cart"]')
        this.lnkCarrinho = page.locator('//button[@routerlink="/dashboard/cart"]')
    }

    async adicionar_produto(produto){
        await this.lstProdutos.filter({hasText:produto}).getByRole('button',{name:' Add To Cart'}).click();
        await expect(this.btnAddCart).toBeVisible();
    }

    async validar_produto_carrinho(){
        await this.lnkCarrinho.click();
    }
}