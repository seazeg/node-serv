import puppeteer from 'puppeteer';
import { resolve as _resolve } from 'path';
import devices from './DeviceDescriptors';
import { guid } from 'eg-utils';
import { yellow } from 'chalk';
import dirExists from './utils';
import { daoLogger } from '../../../g2m/lib'
import spmDrawing from './spm'
const resolve = file => _resolve(__dirname, file)

const config = {
    headless: true,
    timeout: 30000
}
export default async function run({
    hostName = 'www.haier.com/cn/',
    devic = 'iPhone 6',
    storagePath = resolve('/Users/geng/Project/Person/node-work/screenshot/'),
    isSpm = true,
    spmC = '',
    isAnnotated = true
} = {}) {
    try {
        daoLogger('app:screenshot').info(yellow("正在获取页面信息.."))
        const browser = await puppeteer.launch({
            // executablePath: config.executablePath,
            headless: config.headless,
            timeout: config.timeout,
            args: ['--no-sandbox','--disable-setuid-sandbox','-–disable-gpu','–-disable-dev-shm-usage','–-no-zygote','-–single-process']
        });
        const page = await browser.newPage();
        await page.emulate(devices[devic])
        await page.goto(`http://${hostName}`, {
            timeout: config.timeout,
            waitUntil: 'networkidle0'
        })
        await autoScroll(page);
        daoLogger('app:screenshot').info(yellow("开始截图.."))
        dirExists(storagePath)
        let tempName = guid();
        if(isSpm){
             await spmDrawing(page, spmC, isAnnotated)
        }
        await page.screenshot({
            path: `${storagePath}/${tempName}.jpg`,
            quality: 100,
            fullPage: true,
            type: 'jpeg'
        });
        daoLogger('app:screenshot').info(yellow("完成截图.."))
        await browser.close();
        daoLogger('app:screenshot').info(yellow("done!"))
        return {
            data: {
                fileName: `${tempName}.jpg`
            },
            isSuccess: true,
            resultMsg: "执行成功！"
        }
    } catch (error) {
        daoLogger('app:screenshot').error(error)
        let errorlst = {
            data: "",
            isSuccess: false,
            resultMsg: "执行失败！"
        };
        if (error.code == 'ENOENT') {
            errorlst.resultMsg = "目录无效"
        }
        return errorlst
    }
}


async function autoScroll(page) {
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 500;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        })
    });
}

