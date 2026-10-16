import { test, expect } from '@playwright/test';

test('validar mensagem de erro com usuario vazio',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('');
    await page.locator('[type=password]').fill('learning');
    await page.locator('#signInBtn').click();   
    await page.locator('[style*="block"]').waitFor();
    expect(await page.locator('[style*="block"]').textContent()).toBe('Empty username/password.');
});

test('validar mensagem de erro com senha vazia',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('rahulshetty');
    await page.locator('[type=password]').fill('');
    await page.locator('#signInBtn').click();   
    await page.locator('[style*="block"]').waitFor();
    expect(await page.locator('[style*="block"]').textContent()).toBe('Empty username/password.');
});

test('validar mensagem de erro com usuario e senha vazios',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('');
    await page.locator('[type=password]').fill('');
    await page.locator('#signInBtn').click();   
    await page.locator('[style*="block"]').waitFor();
    expect(await page.locator('[style*="block"]').textContent()).toBe('Empty username/password.');
});

test('validar mensagem de erro com usuario e senha invalidos',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('invaliduser');
    await page.locator('[type=password]').fill('invalidpassword');
    await page.locator('#signInBtn').click();   
    await page.locator('[style*="block"]').waitFor();
    expect(await page.locator('[style*="block"]').textContent()).toBe('Incorrect username/password.');
});

test('validar login com sucesso',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username =  page.locator('#username');
    const password = page.locator('[type=password]');
    const btnSignIn = page.locator('#signInBtn');
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await btnSignIn.click();
    await page.waitForSelector('//div[@class="card-body"]//a');
    const listProducts = await page.locator('//div[@class="card-body"]//a').allTextContents();
    console.log(listProducts);
    await expect(listProducts.toString()).toContain('Blackberry');
});

test('validar produtos da tela clientes',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    await page.waitForSelector('.card-body b');
    const listProducts = await page.locator('.card-body b').allTextContents();
    console.log(listProducts);
    await expect(listProducts.toString()).toContain('iphone 13 pro');
});

test('validar UI controls',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username =  page.locator('#username');
    const password = page.locator('[type=password]');
    const dpnUserRole = page.locator('select.form-control');
    const chkUser = page.locator('//label/span[text()=" User"]');
    const btnSignIn = page.locator('#signInBtn');
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await dpnUserRole.selectOption('consult');
    await chkUser.check()
    await page.locator('#okayBtn').click();
    await expect(chkUser).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await btnSignIn.click();
    await page.pause();
});

test('Interagir entre as diferentes abas',async function({browser}) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const lnkFree = page.locator('[href*="documents-request"]')
    const username =  page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const [pageLnkFree] = await Promise.all([
        context.waitForEvent('page'),
        lnkFree.click() 
    ]);

    await expect(pageLnkFree.url()).toBe('https://rahulshettyacademy.com/documents-request');
    await page.bringToFront();
    await username.fill('teste');
    await page.pause();
});

test('validar que a compra foi efetuada com sucesso',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('testes@gmail.com');
    await page.locator('#userPassword').fill('Aa123456');
    await page.locator('#login').click();
    await page.waitForSelector('.card-body');
    await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).getByRole('button',{name:' Add To Cart'}).click();
    await expect(page.locator('//div[@aria-label="Product Added To Cart"]')).toBeVisible();
    await page.locator('//button[@routerlink="/dashboard/cart"]').click();
    await page.locator('//button[normalize-space()="Checkout"]').click();
    await page.locator('//input[@placeholder="Select Country"]').pressSequentially('Bra',{ delay: 150 });
    await page.locator('//span[text()=" Brazil"]').click();
    await page.locator('//a[text()="Place Order "]').click();
    await expect(page.locator('//div[@aria-label="Order Placed Successfully"]')).toBeVisible();
    const codigoCompra = await page.locator('label[class="ng-star-inserted"]').textContent();
    const codigoCompraLimpo = codigoCompra.split("|")[1].trim();
    await page.locator('//button[@routerlink="/dashboard/myorders"]').click();
    await page.waitForSelector('//th[@scope="row"]');
    await expect(page.locator('//th[@scope="row"]').filter({hasText:codigoCompraLimpo}).textContent()).toBeTruthy();
});

test('playwright special',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByRole('button',{name: 'Submit'}).click();
    expect(await page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();
    await page.getByRole('link',{name:'Shop'}).click()
    await page.locator('app-card').filter({hasText:'Blackberry'}).getByRole('button',{name:'Add'}).click()
    await page.pause();
});

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'Blackberry $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('argentina');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('argentina');
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await expect(page.getByRole('button', { name: 'Purchase' })).toMatchAriaSnapshot(`- button "Purchase"`);
});


test('Create a brand new event', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/');
  await page.getByRole('textbox', { name: 'Email' }).fill('testes@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('A12345678-');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
  await page.getByTestId('event-title-input').fill('event soccer');
  await page.getByLabel('Category*').selectOption('Sports');
  await page.getByRole('textbox', { name: 'City*' }).fill('Brazil');
  await page.getByRole('textbox', { name: 'Venue*' }).fill('12345');
  await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('5');
  await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-10-14T20:49');
  await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('5');
  await page.getByTestId('add-event-btn').click();
  await page.getByTestId('nav-events').click();
  await expect(await page.getByText('5 seats left!')).toBeVisible();
  await page.getByRole('article').filter({ hasText: 'Sportsevent soccerWed, 14' }).getByTestId('book-now-btn').click();
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('teste');
  await page.getByTestId('customer-email').fill('teste@gmail.com');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('1234567890');
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await page.getByTestId('nav-bookings').click();
  await page.getByTestId('nav-events').click();
  await expect(await page.getByText('4 seats left')).toBeVisible();
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
  await page.getByRole('row', { name: 'event soccer Sports Brazil 14' }).getByTestId('delete-event-btn').click();
  await page.getByTestId('confirm-dialog-yes').click();
});



test('booking with 1 ticket should show Eligible for refund', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/');
  await page.getByRole('textbox', { name: 'Email' }).fill('testes@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('A12345678-');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('article').filter({ hasText: 'ConferenceFeaturedWorld Tech' }).getByTestId('book-now-btn').click();
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('testes');
  await page.getByTestId('customer-email').fill('testes@gmail.com');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('1234567890');
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await page.getByRole('button', { name: 'View Details' }).first().click();
  await page.getByTestId('check-refund-btn').click();
  await expect(page.getByTestId('refund-result')).toContainText('Eligible for refund. Single-ticket bookings qualify for a full refund.');
  await page.getByRole('button', { name: 'Cancel Booking' }).click();
  await page.getByTestId('confirm-dialog-yes').click();
});

test('booking with 3 ticket should show Not eligible for refund".', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/');
  await page.getByRole('textbox', { name: 'Email' }).fill('testes@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('A12345678-');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('article').filter({ hasText: 'ConferenceFeaturedWorld Tech' }).getByTestId('book-now-btn').click();
  await page.getByRole('button', { name: '+' }).dblclick();
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('testes');
  await page.getByTestId('customer-email').fill('testes@gmail.com');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('1234567890');
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await page.getByRole('button', { name: 'View Details' }).first().click();
  await page.getByTestId('check-refund-btn').click();
  await expect(page.getByTestId('refund-result')).toContainText('Not eligible for refund. Group bookings (3 tickets) are non-refundable.');
  await page.getByRole('button', { name: 'Cancel Booking' }).click();
  await page.getByTestId('confirm-dialog-yes').click();
});


test('frame', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  const frame = page.frameLocator('#courses-iframe');
  await frame.locator('li a[href*="lifetime-access"]:visible').click()
  await page.pause();
});