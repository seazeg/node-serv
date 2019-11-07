'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.app = undefined;

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koa2Formidable = require('koa2-formidable');

var _koa2Formidable2 = _interopRequireDefault(_koa2Formidable);

var _koa2Cors = require('koa2-cors');

var _koa2Cors2 = _interopRequireDefault(_koa2Cors);

var _koaMorgan = require('koa-morgan');

var _koaMorgan2 = _interopRequireDefault(_koaMorgan);

var _koaFavicon = require('koa-favicon');

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaHelmet = require('koa-helmet');

var _koaHelmet2 = _interopRequireDefault(_koaHelmet);

var _router = require('../router');

var _logger = require('../logger');

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koa2Ratelimit = require('koa2-ratelimit');

var _koa2Ratelimit2 = _interopRequireDefault(_koa2Ratelimit);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();

const root = '/nodeservice';

app.use(_koa2Ratelimit2.default.RateLimit.middleware({
    interval: 5000, // 15 minutes = 15*60*1000
    max: 100 // limit each IP to 100 requests per interval
})).use((0, _koaCompress2.default)({
    filter: function (content_type) {
        return (/text/i.test(content_type)
        );
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
})).use((0, _koaHelmet2.default)()).use((0, _koa2Formidable2.default)()).use((0, _koaBodyparser2.default)()).use((0, _koa2Cors2.default)()).use((0, _koaMount2.default)(root, (0, _koaFavicon2.default)(__dirname + '../../../static/favicon.ico'))).use((0, _koaMount2.default)(root, (0, _koaStatic2.default)(require('path').join(__dirname + '../../../static')))).use((0, _koaMorgan2.default)('[:remote-addr] - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms')).use(async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.body = 'No page found and jump to 404';
            (0, _logger.serviceLogger)('server:app').warn('No page found and jump to 404');
        }
    } catch (err) {
        (0, _logger.serviceLogger)('server:app').error(err);
    }
}).use(_router.router.routes(), _router.router.allowedMethods());

exports.app = app;
exports.register = _router.register;