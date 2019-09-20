'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.router = undefined;

var _koaSwaggerDecorator = require('koa-swagger-decorator');

var _logger = require('../../logger');

var _interceptor = require('./interceptor');

var _interceptor2 = _interopRequireDefault(_interceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const application = process.env.NODE_ENV == 'pro' ? '/nodeservice' : '';
const koaRouterOpts = { prefix: application };
const router = new _koaSwaggerDecorator.SwaggerRouter(koaRouterOpts);

router.use(_interceptor2.default.routes());

router.get('/', async (ctx, next) => {
    ctx.type = 'html';
    // ctx.body = await fs.createReadStream(resolve('../index.html'), 'utf-8');
    ctx.body = '服务启动';
    (0, _logger.serviceLogger)('server:service').info('服务启动');
});

router.swagger({
    title: 'API V2 Server',
    description: 'API DOC',
    version: '1.0.0',
    swaggerHtmlEndpoint: '/swagger-html',
    swaggerJsonEndpoint: '/swagger-json'
});

function config(dir) {
    router.mapDir(dir);
    console.log(router);
}

exports.router = router;
exports.config = config;