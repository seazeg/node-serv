'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prefix = exports.body = exports.query = exports.tags = exports.summary = exports.request = undefined;

var _koaSwaggerDecorator = require('koa-swagger-decorator');

exports.request = _koaSwaggerDecorator.request;
exports.summary = _koaSwaggerDecorator.summary;
exports.tags = _koaSwaggerDecorator.tags;
exports.query = _koaSwaggerDecorator.query;
exports.body = _koaSwaggerDecorator.body;
exports.prefix = _koaSwaggerDecorator.prefix;