'use strict';
// const router = require("koa-router")()
// const walk = require('walk')
// import walk from 'walk'
import {SwaggerRouter} from 'koa-swagger-decorator';
// import { serviceLogger } from '../../logger';
// import interceptor from './interceptor';


import Api2Router from './v2';

const router = new SwaggerRouter();


router.use(Api2Router.routes());

// swagger docs avaliable at http://localhost:3000/swagger-html
router.swagger({
  title: 'API V2 Server',
  description: 'API DOC',
  version: '1.0.0'
});


// const application = process.env.NODE_ENV == 'pro' ? '/nodeservice' : ''
// router.prefix(application)

// router.use(interceptor.routes())

// router.get('/', async (ctx, next) => {
//     ctx.type = 'html'
//     // ctx.body = await fs.createReadStream(resolve('../index.html'), 'utf-8');
//     ctx.body = '服务启动'
//     serviceLogger('server:service').info('服务启动')
// })

async function config(dir) {
  console.log(dir);
    router.mapDir(dir,{
      default:false
    })
    // router.mapDir(dir);
    // let walker = walk.walk(dir, {
    //     filters: ["spider"]
    // });
    // walker.on('file', function (root, fileStats, next) {
    //     let file = fileStats.name;
    //     if (/(\.(js))$/.test(file)) {
    //         const file_entity = require(`${root}/${file}`);
    //         if (file.includes('main')) {
    //             router.use(file_entity.routes(), file_entity.allowedMethods());
    //         }
    //         next();
    //     }
    //     else {
    //         next();
    //     }
    // });
    // walker.on('errors', function (root, stat, next) {
    //     serviceLogger('server:service').error(`[errors] ${stat.error}`);
    //     next();
    // });
    // walker.on('nodeError', function (root, stat, next) {
    //     serviceLogger('server:service').error(`[nodeError] ${stat.error}`);
    //     next();
    // });
    // walker.on('directoryError', function (root, stat, next) {
    //     serviceLogger('server:service').error(`[directoryError] ${stat.error}`);
    //     next();
    // });
    // walker.on("end", function () {
    //     serviceLogger('server:service').info(`Service registration success `);
    // });
}

export  {
    router,
    config
}
