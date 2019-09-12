const router = require("koa-router")()
const run = require('./core')
const chalk = require('chalk')
const log = console.log;

router.get('/api/screenshot', (ctx, next) => {
    return new Promise(function (resolve, reject) {
        let params = {
            hostName: ctx.query.hostName,
            devic: ctx.query.devic,
            storagePath: ctx.query.storagePath
        }
        log('获取参数：', chalk.blue(JSON.stringify(params)))
        run(params).then(function (result) {
            ctx.body = result
            resolve(next());
        })
    });
})