'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2;

var _koaSwaggerDecorator = require('koa-swagger-decorator');

var _core = require('./screenshot/core');

var _core2 = _interopRequireDefault(_core);

var _chalk = require('chalk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

const log = console.log;

const tag = (0, _koaSwaggerDecorator.tags)(['mb']);

let Screenshot = (_dec = (0, _koaSwaggerDecorator.prefix)('/nodeservice'), _dec2 = (0, _koaSwaggerDecorator.request)('get', '/screenshot'), _dec3 = (0, _koaSwaggerDecorator.summary)('截图功能'), _dec4 = (0, _koaSwaggerDecorator.query)({
    hostName: { type: 'string', description: '目标域名' },
    devic: { type: 'string', description: '终端类型' },
    storagePath: { type: 'string', description: '输出路径' }
}), _dec(_class = (_class2 = class Screenshot {
    async screenshot(ctx) {
        return new Promise(function (resolve, reject) {
            const { hostName, devic, storagePath } = ctx.validatedQuery;
            // log('获取参数：', blue(JSON.stringify(params)))
            (0, _core2.default)({ hostName, devic, storagePath }).then(function (result) {
                ctx.body = result;
                resolve();
            });
        });
    }
}, (_applyDecoratedDescriptor(_class2.prototype, 'screenshot', [_dec2, _dec3, tag, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'screenshot'), _class2.prototype)), _class2)) || _class);
exports.default = Screenshot;