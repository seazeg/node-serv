import puppeteer from 'puppeteer';
import { resolve as _resolve } from 'path';
import devices from './DeviceDescriptors';
import { guid, trim } from 'eg-utils';
import { yellow,red } from 'chalk';
import dirExists from './utils';
import { daoLogger } from '../../../g2m/lib'
import spmDrawing from './spm'
require("events").EventEmitter.defaultMaxListeners = 10;

const config = {
    headless: true,
    timeout: 50000
}
export default async function run({
    hostName = '',
    devic = '14PC',
    storagePath = '',
    fileName = '',
    isSpm = '',
    spmC = '',
    isAnnotated = ''
} = {}) {

    return await puppeteer.launch({
        headless: config.headless,
        timeout: config.timeout,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '-–disable-gpu', '–-disable-dev-shm-usage', '–-no-zygote', '-–single-process']
    }).then(async browser => {
        const page = await browser.newPage();
        await page.goto(`${hostName}`, {
            timeout: config.timeout,
            waitUntil: 'networkidle2'
        }).catch(err => {
            daoLogger('app:screenshot').error(red('加载出现异常=> ' + err))
        })
        try {
            let hasError = false

            dirExists(trim(storagePath, 'side'))
            daoLogger('app:screenshot').info(yellow("正在获取页面信息.."))

            const page = await browser.newPage();
            let tempName = null;
            await page.emulate(devices[devic])
            await page.goto(`${hostName}`, {
                timeout: config.timeout,
                waitUntil: 'networkidle2'
            }).catch(err => {
                daoLogger('app:screenshot').error(red(`${fileName}>加载出现异常=> ${err}`))
            })

            await autoScroll(page);
            daoLogger('app:screenshot').info(yellow("开始截图.."))

            if (!fileName) {
                tempName = guid();
            } else {
                tempName = fileName
            }

            if (isSpm) {
                await spmDrawing(page, spmC, isAnnotated)
            }

            await page.screenshot({
                path: `${storagePath}/${tempName}.jpg`,
                quality: 100,
                fullPage: true,
                type: 'jpeg'
            }).catch(err => {
                daoLogger('app:screenshot').error(red('截图出现异常=> ' + err))
                browser.close();
                hasError = true
            })

            if (!hasError) {
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
            } else {
                await browser.close();
                let errorlst = {
                    data: "",
                    isSuccess: false,
                    resultMsg: "执行失败！"
                };
                return errorlst
            }

        } catch (error) {
            daoLogger('app:screenshot').error(red(error))
            await browser.close();
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
    }).catch(err => {
        daoLogger('app:screenshot').error(red('实例出现异常=> ' + err))
    });




}


async function autoScroll(page) {
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 200;
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