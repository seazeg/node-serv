'use strict';
const winston = require('winston');
const {
    formatter,
    timestampFormatter
} = require('./options')
const resolve = file => require('path').resolve(__dirname, file)
require('winston-daily-rotate-file');

exports.transportConsole = new winston.transports.Console({
    json: false,
    prettyPrint: true,
    colorize: true,
    level: 'debug',
    timestamp: timestampFormatter,
    formatter: formatter,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD'
});

exports.debugTransport = new winston.transports.DailyRotateFile({
    name: 'full',
    filename:'debug-%DATE%.log',
    dirname:resolve('../../../logs/%DATE%'),
    json: false,
    level: 'debug',
    maxSize: 1024 * 1024 * 10,
    maxFiles: '7d',
    timestamp: timestampFormatter,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD'
});

exports.serviceTransport = new winston.transports.DailyRotateFile({
    name: 'service',
    filename:'service-%DATE%.log',
    dirname:resolve('../../../logs/%DATE%'),
    json: false,
    level: 'debug',
    maxSize: 1024 * 1024 * 10,
    maxFiles: '7d',
    timestamp: timestampFormatter,
    datePattern: 'YYYY-MM-DD'
});

exports.daoTransport = new winston.transports.DailyRotateFile({
    name: 'dao',
    filename:'dao-%DATE%.log',
    dirname:resolve('../../../logs/%DATE%'),
    json: false,
    level: 'debug',
    maxSize: 1024 * 1024 * 10,
    maxFiles: '7d',
    timestamp: timestampFormatter,
    datePattern: 'YYYY-MM-DD'
});