import {expect} from '@playwright/test'

export class ApiUtils{

    constructor(apiContext,loginPayload){
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken(){
        const loginResponse = await this.apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: this.loginPayload
        });
        await expect(loginResponse.ok()).toBeTruthy();
        const loginJson = await loginResponse.json();
        return loginJson.token;
    };

    async createOrder(orderPayload){
        const token = await this.getToken()
        
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
        await expect(orderResponse.ok()).toBeTruthy();
        const orderJson = await orderResponse.json();
        return orderJson.orders[0];
    };
};