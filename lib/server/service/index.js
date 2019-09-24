'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.router = undefined;

var _middleware = require('../../../middleware');

var _logger = require('../../logger');

var _interceptor = require('./interceptor');

var _interceptor2 = _interopRequireDefault(_interceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const application = process.env.NODE_ENV == 'pro' ? '/nodeservice' : '';
const koaRouterOpts = { prefix: application };
const router = new _middleware.SwaggerRouter(koaRouterOpts);

router.use((0, _interceptor2.default)().routes());

router.get('/', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = `
    ██████╗ ██████╗ ███╗   ███╗
   ██╔════╝ ╚════██╗████╗ ████║
   ██║  ███╗ █████╔╝██╔████╔██║
   ██║   ██║██╔═══╝ ██║╚██╔╝██║
   ╚██████╔╝███████╗██║ ╚═╝ ██║
    ╚═════╝ ╚══════╝╚═╝     ╚═╝
                               
   ███████╗██╗   ██╗ █████╗ ███╗   ██╗    ██████╗ 
   ██╔════╝██║   ██║██╔══██╗████╗  ██║   ██╔════╝ 
   █████╗  ██║   ██║███████║██╔██╗ ██║   ██║  ███╗
   ██╔══╝  ╚██╗ ██╔╝██╔══██║██║╚██╗██║   ██║   ██║
   ███████╗ ╚████╔╝ ██║  ██║██║ ╚████║██╗╚██████╔╝
   ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝ 
   `;
  (0, _logger.serviceLogger)('server:service').info('服务启动');
});

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
        name: 'api_key'
      }
    }
  }
});

function config(dir) {
  router.mapDir(dir);
}

exports.router = router;
exports.config = config;