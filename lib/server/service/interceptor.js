'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _middleware = require('../../../middleware');

var _logger = require('../../logger');

const router = new _middleware.SwaggerRouter();

//前置拦截器
router.all('*', async (ctx, next) => {
    try {
        await next();
        (0, _logger.serviceLogger)('server:interceptor').info('接口前置拦截开启');
        //todo
    } catch (e) {
        ctx.throw(500, e);
    }
});

exports.default = router;