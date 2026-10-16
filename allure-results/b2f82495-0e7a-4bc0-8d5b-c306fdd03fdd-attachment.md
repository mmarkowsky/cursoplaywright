# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: uibasicPo.spec.js >> @prod validar que a compra foi efetuada com sucesso do produto matienzo
- Location: tests/uibasicPo.spec.js:9:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.card-body').filter({ hasText: 'matienzo' }).getByRole('button', { name: ' Add To Cart' })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic: Ecom
      - generic [ref=e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=e13]:
          - link "" [ref=e14] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e16] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e18] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e20] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading [level=1] [ref=e24]:
        - text: Practice Website for
        - emphasis [ref=e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=e28]:
      - paragraph [ref=e29]:
        - generic [ref=e30]: Register to sign in with your personal account
      - generic [ref=e31]:
        - heading "Log in" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: Email
            - textbox "email@example.com" [ref=e36]: prueba@gmail.com
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [ref=e39]: "12345678"
          - button "Login" [active] [ref=e40] [cursor=pointer]
        - link "Forgot password?" [ref=e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=e43]:
    - heading "Why People Choose Us?" [level=1] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e49]: 
        - generic [ref=e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=e52]: Successfull Orders
      - generic [ref=e53]:
        - generic [ref=e54]: 
        - generic [ref=e56]:
          - heading "37653" [level=1]
          - paragraph [ref=e57]: Customers
      - generic [ref=e58]:
        - generic [ref=e59]: 
        - generic [ref=e61]:
          - heading "3243" [level=1]
          - paragraph [ref=e62]: Sellers
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e65]: 
        - generic [ref=e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=e68]: Daily Orders
      - generic [ref=e69]:
        - generic [ref=e70]: 
        - generic [ref=e72]:
          - heading "500+" [level=1]
          - paragraph [ref=e73]: Daily New Customer Joining
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | 
  3  | export class DashBoardPage{
  4  | 
  5  |     constructor(page){
  6  |         this.page = page;
  7  |         this.lstProdutos = page.locator(".card-body")
  8  |         this.btnAddCart = page.locator('//div[@aria-label="Product Added To Cart"]')
  9  |         this.lnkCarrinho = page.locator('//button[@routerlink="/dashboard/cart"]')
  10 |     }
  11 | 
  12 |     async adicionar_produto(produto){
> 13 |         await this.lstProdutos.filter({hasText:produto}).getByRole('button',{name:' Add To Cart'}).click();
     |                                                                                                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
  14 |         await expect(this.btnAddCart).toBeVisible();
  15 |     }
  16 | 
  17 |     async validar_produto_carrinho(){
  18 |         await this.lnkCarrinho.click();
  19 |     }
  20 | }
```