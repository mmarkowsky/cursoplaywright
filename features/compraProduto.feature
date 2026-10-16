Feature: Efetuar compra do pedido

    @reg
    Scenario Outline: Efetuar compra com sucesso
        Given que eu faço o login com o usuario "<username>" e a senha "<password>"
        When adiciono o produto "ZARA COAT 3" no carrinho
        Then valido que o produto foi adicionado no carrinho

    Examples:
        | username | password |
        | testes@gmail.com  | Aa123456  |
        | inex@gmail.com | 123456|

    @val
    Scenario Outline: Efetuar compra com erro
        Given que eu faço o login com o usuario "<username>" e a senha "<password>"
        When adiciono o produto "ZARA COAT 3" no carrinho
        Then valido que o produto foi adicionado no carrinho

    Examples:
        | username | password |
        | testes@gmail.com  | Aa123456  |
        | inex@gmail.com | 123456|