const { Cluster } = require('puppeteer-cluster');
const { guid } = require('eg-utils')
const devices = require('./DeviceDescriptors')
const { yellow } = require('chalk')
require('events').EventEmitter.defaultMaxListeners = 15;
// const dirExists = require('./utils')
// const { daoLogger }  = require('../../../g2m/lib')
// const spmDrawing = require('./spm')


const arr = [
    "haiercn2019_homePage_banner_20191029", "chosen_20190920", "haiercn2019_homePage_star_20191029",
    "ranking_20190920", "haiercn2019_homePage_wholehouse_20191029", "news_20190920"
]

for (let i = 0;i<arr.length;i++) {
    run({spmC:arr[i]})
}

async function run({
    hostName = 'http://www.haier.com/cn/',
    devic = '14PC',
    storagePath = '',
    fileName = '',
    isSpm = true,
    spmC = '',
    isAnnotated = true
} = {}) {
    // daoLogger('app:screenshot').info(yellow("正在获取页面信息.."))
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 3,
        monitor: true,
        timeout: 60000,
        retryLimit: 2,
        retryDelay: 60000,
        puppeteerOptions: {
            headless: false,
            args: ['-–no-first-run','-–no-sandbox','–-no-zygote','–-disable-gpu','-–disable-dev-shm-usage','-–disable-setuid-sandbox','–-single-process']
        }
    });
    await cluster.task(async ({
        page,
        data: url
    }) => {
        core({
            hostName:hostName,
            devic:devic,
            storagePath:storagePath,
            fileName:fileName,
            isSpm:isSpm,
            spmC:spmC,
            isAnnotated:isAnnotated
        },page)
    });

    cluster.queue(hostName);

    await cluster.idle();
    await cluster.close();
}

async function core({
    hostName = 'http://www.haier.com/cn/',
    devic = '14PC',
    storagePath = '',
    fileName = '',
    isSpm = true,
    spmC = '',
    isAnnotated = true
} = {},page){
    let tempName = null;
    await page.emulate(devices[devic])
    await page.goto(url,{
        timeout: 30000,
        waitUntil: 'networkidle0'
    });
    await autoScroll(page);
    // daoLogger('app:screenshot').info(yellow("开始截图.."))
    // dirExists(storagePath)
    if(!fileName){
        tempName = guid();
    }else{
        tempName = fileName
    }
    if(isSpm){
        await page.evaluate((spmC, isAnnotated) => {
            console.log(111);
            const cObj = document.querySelector(`[spm-c="${spmC}"]`)
            cObj.style.cssText = "border: 2px solid red;";
            if (isAnnotated) {
                //移动端适配
                if (window.innerWidth <= 1200) {
                    if (spmC.includes('header')) {
                        document.querySelector('.js_m_menu').click()
                        cObj.click();
                    }
                } else {
                    if (spmC.includes('header')) {
                        cObj.classList.add("cur");
                    }
                }
    
                for (let i = 0; i <= cObj.querySelectorAll('[spm-d]').length + 1; i++) {
                    let sdl = cObj.querySelectorAll(`[spm-d="${i}"]`)
                    let temp;
                    for (let item of sdl) {
                        item.style.cssText = "display:inline-block;border:2px solid red;position:relative;"
    
                        temp = `<div style="position: absolute;display: block;width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;color:red;background: rgba(255,255,255,0.1);z-index:10000;font-size:30px;text-align:center;">${i}</div>`;
    
                        item.insertAdjacentHTML('beforeEnd', temp);
                    }
    
                }
            }
        }, spmC, isAnnotated);
    }
    await page.screenshot({
        path: `../../../screenshot/${guid()}.jpg`,
        quality: 100,
        fullPage: true,
        type: 'jpeg'
    });
    // daoLogger('app:screenshot').info(yellow("完成截图.."))
}


async function autoScroll(page) {
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 1000;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        })
    });
}

async function spmDrawing(page, spmC, isAnnotated) {
    page.evaluate((spmC, isAnnotated) => {
        console.log(111);
        const cObj = document.querySelector(`[spm-c="${spmC}"]`)
        cObj.style.cssText = "border: 2px solid red;";
        if (isAnnotated) {
            //移动端适配
            if (window.innerWidth <= 1200) {
                if (spmC.includes('header')) {
                    document.querySelector('.js_m_menu').click()
                    cObj.click();
                }
            } else {
                if (spmC.includes('header')) {
                    cObj.classList.add("cur");
                }
            }

            for (let i = 0; i <= cObj.querySelectorAll('[spm-d]').length + 1; i++) {
                let sdl = cObj.querySelectorAll(`[spm-d="${i}"]`)
                let temp;
                for (let item of sdl) {
                    item.style.cssText = "display:inline-block;border:2px solid red;position:relative;"

                    temp = `<div style="position: absolute;display: block;width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;color:red;background: rgba(255,255,255,0.1);z-index:10000;font-size:30px;text-align:center;">${i}</div>`;

                    item.insertAdjacentHTML('beforeEnd', temp);
                }

            }
        }
    }, spmC, isAnnotated);
}