import { LoginPage } from '../../tests/pages/LoginPage.js';
import { DashBoardPage } from '../../tests/pages/DashBoardPage.js';
import { chromium} from '@playwright/test';   
import {Before,After} from "@cucumber/cucumber"

Before(async function () {
    const isCI = !!process.env.CI;
    this.browser = await chromium.launch({ headless: isCI ? true : false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.loginPage = new LoginPage(this.page);
    this.dashBoardPage = new DashBoardPage(this.page);
});

After(async function () {
    if (this.browser) {
        //testeee
        await this.browser.close();
    }
});