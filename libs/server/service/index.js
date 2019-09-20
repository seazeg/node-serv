'use strict';
const router = require("koa-router")()
const walk = require('walk')
// const SwaggerRouter = require('koa-swagger-decorator')
// const router = new SwaggerRouter();
const {
    serviceLogger
} = require('../../logger')
const interceptor = require('./interceptor').default

const application = process.env.NODE_ENV == 'pro' ? '/nodeservice' : ''
router.prefix(application)

router.use(interceptor.routes())

router.get('/', async (ctx, next) => {
    ctx.type = 'html'
    // ctx.body = await fs.createReadStream(resolve('../index.html'), 'utf-8');
    ctx.body = '服务启动'
    serviceLogger('server:service').info('服务启动')
})


// router.swagger({
//     title: 'API V2 Server',
//     description: 'API DOC',
//     version: '1.0.0'
// });

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
                if (file.includes('main')) {            
                    router.use(file_entity.routes(), file_entity.allowedMethods())
                }
                next()
            } else {
                next()
            }
        });
        walker.on('errors', function (root, stat, next) {
            serviceLogger('server:service').error(`[errors] ${stat.error}`)
            next();
        });
        walker.on('nodeError', function (root, stat, next) {
            serviceLogger('server:service').error(`[nodeError] ${stat.error}`)
            next();
        });
        walker.on('directoryError', function (root, stat, next) {
            serviceLogger('server:service').error(`[directoryError] ${stat.error}`)
            next();
        });
        walker.on("end", function () {
            serviceLogger('server:service').info(`Service registration success `)
        });
    }

    // config: router.mapDir(dir, {
    //     // default: true. To recursively scan the dir to make router. If false, will not scan subroutes dir
    //     // recursive: true,
    //     // default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
    //     // doValidation: true,
    //     // default: [], paths to ignore while looking for decorators 
    //     // ignore: ["**.spec.ts"],
    // })
}