'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.daoLogger = exports.serviceLogger = exports.logger = exports.prefix = exports.body = exports.query = exports.tags = exports.summary = exports.request = undefined;

var _middleware = require('../middleware');

var _logger = require('./logger');

exports.request = _middleware.request;
exports.summary = _middleware.summary;
exports.tags = _middleware.tags;
exports.query = _middleware.query;
exports.body = _middleware.body;
exports.prefix = _middleware.prefix;
exports.logger = _logger.logger;
exports.serviceLogger = _logger.serviceLogger;
exports.daoLogger = _logger.daoLogger;