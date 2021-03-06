'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g2m = exports.decorators = exports.daoLogger = exports.serviceLogger = exports.logger = undefined;

var _swagger = require('../middleware/swagger');

var _logger = require('./logger');

var _server = require('./server');

const decorators = {
    request: _swagger.request,
    summary: _swagger.summary,
    tags: _swagger.tags,
    query: _swagger.query,
    body: _swagger.body,
    prefix: _swagger.prefix
};

exports.logger = _logger.logger;
exports.serviceLogger = _logger.serviceLogger;
exports.daoLogger = _logger.daoLogger;
exports.decorators = decorators;
exports.g2m = _server.g2m;