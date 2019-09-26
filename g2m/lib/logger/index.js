'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loggerConfig = exports.daoLogger = exports.serviceLogger = exports.logger = undefined;

var _default = require('./module/default');

var _service = require('./module/service');

var _dao = require('./module/dao');

var _module = require('./module/');

exports.logger = _default.logger;
exports.serviceLogger = _service.serviceLogger;
exports.daoLogger = _dao.daoLogger;
exports.loggerConfig = _module.loggerConfig;

// logger('testDefault1').debug('a', 'b', 'c', 'd');
// logger('testDefault2').info('a', 'b', 'c', 'd');
// logger('testDefault3').warn('a', 'b', 'c', 'd');
// logger('testDefault4').error('a', 'b', 'c', 'd');

// serviceLogger('testService1').debug('a', 'b', 'c', 'd');
// serviceLogger('testService2').info('a', 'b', 'c', 'd');
// serviceLogger('testService3').warn('a', 'b', 'c', 'd');
// serviceLogger('testService4').error('a', 'b', 'c', 'd');

// daoLogger('testDao1').debug('a', 'b', 'c', 'd');
// daoLogger('testDao2').info('a', 'b', 'c', 'd');
// daoLogger('testDao3').warn('a', 'b', 'c', 'd');
// daoLogger('testDao4').error('a', 'b', 'c', 'd');