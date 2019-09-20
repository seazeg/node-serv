'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.daoTransport = exports.serviceTransport = exports.debugTransport = exports.transportConsole = undefined;

var _winston = require('winston');

var _conf = require('./conf');

require('winston-daily-rotate-file');

const transportConsole = exports.transportConsole = new _winston.transports.Console({
    json: false,
    prettyPrint: true,
    colorize: true,
    level: 'info',
    timestamp: _conf.timestampFormatter,
    formatter: _conf.formatter,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD'
});

const debugTransport = exports.debugTransport = new _winston.transports.DailyRotateFile(Object.assign({
    name: 'full',
    filename: 'debug-%DATE%.log',
    level: 'debug',
    handleExceptions: true
}, _conf.baseConf));

const serviceTransport = exports.serviceTransport = new _winston.transports.DailyRotateFile(Object.assign({
    name: 'service',
    filename: 'service-%DATE%.log',
    level: 'debug'
}, _conf.baseConf));

const daoTransport = exports.daoTransport = new _winston.transports.DailyRotateFile(Object.assign({
    name: 'dao',
    filename: 'dao-%DATE%.log',
    level: 'debug'
}, _conf.baseConf));