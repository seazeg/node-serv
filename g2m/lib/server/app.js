'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.app = undefined;

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koa2Cors = require('koa2-cors');

var _koa2Cors2 = _interopRequireDefault(_koa2Cors);

var _koaMorgan = require('koa-morgan');

var _koaMorgan2 = _interopRequireDefault(_koaMorgan);

var _service = require('./service');

var _logger = require('../logger');

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RateLimit = require('koa2-ratelimit').RateLimit;

const limiter = RateLimit.middleware({
    interval: { min: 15 }, // 15 minutes = 15*60*1000
    max: 100 // limit each IP to 100 requests per interval
});

const app = new _koa2.default();
app.use((0, _koaBodyparser2.default)()).use((0, _koa2Cors2.default)()).use((0, _koaStatic2.default)(require('path').join(__dirname + '../../../static'))).use((0, _koaMorgan2.default)('[:remote-addr] - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')).use(async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.body = 404;
            (0, _logger.serviceLogger)('server:app').warn('No page found and jump to 404');
        }
    } catch (err) {
        (0, _logger.serviceLogger)('server:app').error(err);
    }
}).use(_service.router.routes(), _service.router.allowedMethods()).use(limiter);

exports.app = app;
exports.config = _service.config;