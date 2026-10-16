import {expect} from '@playwright/test'
//import { customerTest } from './utils/fixture';

//customerTest.only('Fixture Test',async ({authenticatedPage,createOrderPage}) =>{
//    await authenticatedPage.goto('https://rahulshettyacademy.com/client/');
//    await authenticatedPage.locator('//button[@routerlink="/dashboard/myorders"]').click();
//    await authenticatedPage.waitForSelector('//th[@scope="row"]');
//    await expect(await authenticatedPage.locator('//th[@scope="row"]').filter({hasText:createOrderPage}).textContent()).toBeTruthy();
//})