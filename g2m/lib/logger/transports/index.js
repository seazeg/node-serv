'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transport = undefined;

var _winston = require('winston');

var _formatter = require('./formatter');

require('winston-daily-rotate-file');

const transport = exports.transport = conf => {
    const baseConf = {
        json: conf.json || false,
        maxSize: conf.maxSize || 1024 * 1024 * 10,
        maxFiles: conf.maxFiles || '7d',
        timestamp: _formatter.timestampFormatter,
        datePattern: conf.datePattern || 'YYYY-MM-DD',
        zippedArchive: conf.zippedArchive || true,
        prepend: conf.prepend || true,
        dirname: conf.dirname || require('path').resolve(__dirname, '../../../../logs/%DATE%')
    };
    const transportConsole = new _winston.transports.Console({
        json: false,
        prettyPrint: true,
        colorize: true,
        level: 'info',
        timestamp: _formatter.timestampFormatter,
        formatter: _formatter.formatter,
        handleExceptions: true,
        datePattern: 'YYYY-MM-DD'
    });

    const debugTransport = new _winston.transports.DailyRotateFile(Object.assign({
        name: 'full',
        filename: 'debug-%DATE%.log',
        level: 'debug',
        handleExceptions: true
    }, baseConf));

    const serviceTransport = new _winston.transports.DailyRotateFile(Object.assign({
        name: 'service',
        filename: 'service-%DATE%.log',
        level: 'debug'
    }, baseConf));

    const daoTransport = new _winston.transports.DailyRotateFile(Object.assign({
        name: 'dao',
        filename: 'dao-%DATE%.log',
        level: 'debug'
    }, baseConf));

    return {
        transportConsole: transportConsole,
        debugTransport: debugTransport,
        serviceTransport: serviceTransport,
        daoTransport: daoTransport
    };
};