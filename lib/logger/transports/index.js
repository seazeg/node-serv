'use strict';
const winston = require('winston');
const {
    formatter,
    baseConf,
    timestampFormatter
} = require('./conf')
require('winston-daily-rotate-file');
const resolve = file => require('path').resolve(__dirname, file)


exports.transportConsole = new winston.transports.Console({
    json: false,
    prettyPrint: true,
    colorize: true,
    level: 'info',
    timestamp: timestampFormatter,
    formatter: formatter,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD'
});

exports.debugTransport = new winston.transports.DailyRotateFile(Object.assign({
    name: 'full',
    filename: 'debug-%DATE%.log',
    level: 'info',
    handleExceptions: true
}, baseConf));

exports.serviceTransport = new winston.transports.DailyRotateFile(Object.assign({
    name: 'service',
    filename: 'service-%DATE%.log',
    level: 'debug'
}, baseConf));

exports.daoTransport = new winston.transports.DailyRotateFile(Object.assign({
    name: 'dao',
    filename: 'dao-%DATE%.log',
    level: 'debug'
}, baseConf));