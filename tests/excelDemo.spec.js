import {test , expect , request} from '@playwright/test'
import ExcelJs from 'exceljs'
import path from 'path';
import { fileURLToPath } from 'url';


async function excelTest(){
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.resolve(__dirname, './massa/fruits.xlsx');
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    console.log(filePath);
    const worksheet = workbook.worksheets[0];
    const cell = worksheet.getCell(3,3);
    cell.value = 'Teste';
    await workbook.xlsx.writeFile(filePath);
}   

test('download', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    const download = await downloadPromise;
    const path = "./tests/massa/fruits.xlsx";
    await download.saveAs(path);
})

test('Upload', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    await excelTest();
    await page.locator('#fileinput').setInputFiles('./tests/massa/fruits.xlsx')
    await expect(page.locator('//div[text()="Updated Excel Data Successfully."]')).toBeVisible();
    await page.pause();
})