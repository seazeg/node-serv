import { SwaggerRouter } from '../../middleware/swagger';
import { serviceLogger } from '../logger';
import interceptor from './interceptor';

const application = process.env.NODE_ENV == 'pro' ? '/nodeservice' : ''
const koaRouterOpts = { prefix: application };
const router = new SwaggerRouter(koaRouterOpts);

router.use(interceptor().routes())

router.get('/', async (ctx, next) => {
    ctx.type = 'html'
    ctx.body = '服务启动'
    serviceLogger('server:service').info('服务启动')
})

router.swagger({
  title: 'Node App API',
  description: 'API DOC',
  version: '1.0.0',
  swaggerHtmlEndpoint: '/doc/swagger-html',
  swaggerJsonEndpoint: '/doc/swagger-json',
  swaggerOptions: {
    securityDefinitions: {
      api_key: {
        type: 'apiKey',
        in: 'header',
        name: 'api_key',
      },
    },
  }
});

function config(dir) {
   router.mapDir(dir)
}

export  {
    router,
    config
}
