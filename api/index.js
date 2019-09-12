const router = require("koa-router")()
const fs = require('fs')
const chalk = require('chalk')
const log = console.log;
const resolve = file => path.resolve(__dirname, file)

const run = require('../src/screenshot/core')


const application = process.env.ENV == 'pro' ? '/nodeservice' : ''

router.prefix(application)
//前置拦截器
router.all('*', async (ctx, next) => {
    try {
        await next();
        //todo
    } catch (e) {
        ctx.throw(500, e);
    }
});

router.get('/', async (ctx, next) => {
    ctx.type = 'html';
    // ctx.body = await fs.createReadStream(resolve('../index.html'), 'utf-8');
    ctx.body = '服务启动'
})

// router.get('/api/screenshot', (ctx, next) => {
//     return new Promise(function (resolve, reject) {
//         let params = {
//             hostName: ctx.query.hostName,
//             devic: ctx.query.devic,
//             storagePath: ctx.query.storagePath
//         }
//         log('获取参数：', chalk.blue(JSON.stringify(params)))
//         run(params).then(function (result) {
//             ctx.body = result
//             resolve(next());
//         })
//     });
// })

module.exports = router