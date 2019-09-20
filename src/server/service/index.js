'use strict';
import { SwaggerRouter } from 'koa-swagger-decorator';
import { serviceLogger } from '../../logger';
import interceptor from './interceptor';

const application = process.env.NODE_ENV == 'pro' ? '/nodeservice' : ''
const koaRouterOpts = { prefix: application };
const router = new SwaggerRouter(koaRouterOpts);

router.use(interceptor.routes())

router.get('/', async (ctx, next) => {
    ctx.type = 'html'
    // ctx.body = await fs.createReadStream(resolve('../index.html'), 'utf-8');
    ctx.body = '服务启动'
    serviceLogger('server:service').info('服务启动')
})

router.swagger({
  title: 'API V2 Server',
  description: 'API DOC',
  version: '1.0.0',
  swaggerHtmlEndpoint: '/swagger-html',
  swaggerJsonEndpoint: '/swagger-json',
});

function config(dir) {
   router.mapDir(dir)
   console.log(router);
}

export  {
    router,
    config
}
