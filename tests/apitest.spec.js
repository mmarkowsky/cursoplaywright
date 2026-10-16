import {test , expect , request} from '@playwright/test'
import { ApiUtils } from './utils/ApiUtils';

const orderPayload = {orders: [{country: "Armenia",productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
const loginPayload = {userEmail: "testes@gmail.com",userPassword: "Aa123456"}
let apiUtils;

test.beforeAll(async() => {
    const apiContext = await request.newContext();
    apiUtils = new ApiUtils(apiContext, loginPayload);
});

test.beforeEach( async({page}) =>{

});

test('Validate e2e using ui e api test', async({page}) => {
    const response = await apiUtils.createOrder(orderPayload);
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },response.token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('//button[@routerlink="/dashboard/myorders"]').click();
    await page.waitForSelector('//th[@scope="row"]');
    await expect(page.locator('//th[@scope="row"]').filter({hasText:response.orderId}).textContent()).toBeTruthy();
});

test('Validate mensagem sem orders', async({page}) => {
    let body = JSON.stringify({"data":[],"message":"No Orders"});
    const response = await apiUtils.createOrder(orderPayload);
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },response.token);
    await page.goto('https://rahulshettyacademy.com/client/');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6ac52fe02be7a4bc2b8f5859",
        async route =>   {
            const response = await page.request.fetch(route.request());
            route.fulfill({
                response,
                body,
            })});

    await page.locator('//button[@routerlink="/dashboard/myorders"]').click();
    await expect(page.locator('//div[@class="mt-4 ng-star-inserted"]')).toContainText(' You have No Orders to show at this time. Please Visit Back Us ');
});

test('Intecept api network', async({page}) => {
    const response = await apiUtils.createOrder(orderPayload);
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },response.token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('//button[@routerlink="/dashboard/myorders"]').click();
    //await page.locator('//tr[@class="ng-star-inserted"]').filter({ hasText: '6acc298b4132e8fee725246c' }).getByRole('button',{name:'View'}).click();
    
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    async route => {
        await route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6acc288e4132e8fee7252390'})
    });
    await page.pause();
    await page.locator('button:has-text("View")').first().click();
    await page.pause();
});