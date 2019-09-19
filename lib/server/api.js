'use strict';
const router = require("koa-router")()
const walk = require('walk')
const { serviceLogger } = require('../logger')
const application = process.env.NODE_ENV == 'pro' ? '/nodeservice' : ''
router.prefix(application)

//前置拦截器
router.all('*', async (ctx, next) => {
    try {
        await next();
        serviceLogger('server:api').info('服务前置拦截开启')
        //todo
    } catch (e) {
        ctx.throw(500, e);
    }
});

router.get('/', async (ctx, next) => {
    ctx.type = 'html'
    // ctx.body = await fs.createReadStream(resolve('../index.html'), 'utf-8');
    ctx.body = '服务启动'
    serviceLogger('server:api').info('服务启动')
})


module.exports = {
    router: router,
    config: async (dir) => {
        let walker = walk.walk(dir, {
            filters: ["spider"]
        });
        walker.on('file', function (root, fileStats, next) {
            let file = fileStats.name
            if (/(\.(js))$/.test(file)) {
                const file_entity = require(`${root}/${file}`);
                if (file.includes('index')) {            
                    router.use(file_entity.routes(), file_entity.allowedMethods())
                }
                next()
            } else {
                next()
            }
        });
        walker.on('errors', function (root, stat, next) {
            serviceLogger('server:api').error(`[errors] ${stat.error}`)
            next();
        });
        walker.on('nodeError', function (root, stat, next) {
            serviceLogger('server:api').error(`[nodeError] ${stat.error}`)
            next();
        });
        walker.on('directoryError', function (root, stat, next) {
            serviceLogger('server:api').error(`[directoryError] ${stat.error}`)
            next();
        });
        walker.on("end", function () {
            serviceLogger('server:api').info(`Service registration success .`)
        });
    }
}