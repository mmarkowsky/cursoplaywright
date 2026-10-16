import { LoginPage } from '../../tests/pages/LoginPage.js';
import { DashBoardPage } from '../../tests/pages/DashBoardPage.js';
import { chromium} from '@playwright/test';   
import {Before,After} from "@cucumber/cucumber"

Before(async function () {
    this.browser = await chromium.launch({ headless: false }); 
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.loginPage = new LoginPage(this.page);
    this.dashBoardPage = new DashBoardPage(this.page);
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});