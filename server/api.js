'use strict';
const router = require("koa-router")()
const walk = require('walk')
const application = process.env.ENV == 'pro' ? '/nodeservice' : ''
router.prefix(application)

//前置拦截器
router.all('*', async (ctx, next) => {
    try {
        await next();
        console.log('开启前置');
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
        walker.on('errors', function (root, nodeStatsArray, next) {
            // console.log('错误！');
            next();
        });
        walker.on('nodeError', function (root, nodeStatsArray, next) {
            // console.log('错误！');
            next();
        });
        walker.on('directoryError', function (root, nodeStatsArray, next) {
            // console.log('错误！');
            next();
        });
    }
}