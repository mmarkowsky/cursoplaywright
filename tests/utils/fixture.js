import {request} from '@playwright/test'
const { ApiUtils }= require('./ApiUtils.js');
const base = require('@playwright/test')
const loginPayload = {userEmail: "testes@gmail.com",userPassword: "Aa123456"}
const orderPayload = {orders: [{country: "Armenia",productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
let apiUtils;

exports.customerTest = base.test.extend({
    authenticatedPage: async({page},use) => {
        const apiContext = await request.newContext();
        apiUtils = new ApiUtils(apiContext,loginPayload);
        await page.addInitScript(value =>{
            window.localStorage.setItem('token',value);
        },await apiUtils.getToken());
        await use(page);
    },
    createOrderPage: async({},use) => {
        const orderId = await apiUtils.createOrder(orderPayload);
        await use(orderId);
    }
});