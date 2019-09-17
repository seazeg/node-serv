const puppeteer = require('puppeteer');
const path = require('path')
const devices = require('./DeviceDescriptors')
const config = require('./config.json')
const egu = require('eg-utils')
const chalk = require('chalk')
const log = console.log;
const resolve = file => path.resolve(__dirname, file)

module.exports = async function run({
    hostName,
    devic = '14PC',
    storagePath = resolve('./build')
} = {}) {
    try {
        log(chalk.yellow("正在获取页面信息.."))
        const browser = await puppeteer.launch({
            // executablePath: config.executablePath,
            headless: config.headless,
            timeout: config.timeout,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.emulate(devices[devic])
        await page.goto(`http://${hostName}`, {
            timeout: config.timeout,
            waitUntil: 'networkidle2'
        })
        await autoScroll(page);
        log(chalk.yellow("开始截图.."))
        let tempName = egu.guid()
        await page.screenshot({
            path: `${storagePath}/${tempName}.jpeg`,
            quality: 100,
            fullPage: true,
            type: 'jpeg'
        });
        log(chalk.yellow("完成截图.."))
        await browser.close();
        log(chalk.yellow("done!"));
        return {
            data: {
                fileName: `${tempName}.jpeg`
            },
            isSuccess: true,
            resultMsg: "执行成功！"
        }
    } catch (error) {
        log(chalk.red(error))
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
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
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