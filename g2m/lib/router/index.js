'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.router = undefined;

var _swagger = require('../../middleware/swagger');

var _logger = require('../logger');

var _interceptor = require('./interceptor');

var _interceptor2 = _interopRequireDefault(_interceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const application = '/nodeservice';
const koaRouterOpts = { prefix: application };
const router = new _swagger.SwaggerRouter(koaRouterOpts);

router.use((0, _interceptor2.default)().routes());

router.get('/', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = '服务启动';
  (0, _logger.serviceLogger)('server:service').info('服务启动');
});

router.swagger({
  title: 'Node App API',
  description: 'API DOC',
  version: '1.0.0',
  swaggerHtmlEndpoint: '/doc/swagger-api',
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

function register(dir) {
  router.mapDir(dir);
}

exports.router = router;
exports.register = register;