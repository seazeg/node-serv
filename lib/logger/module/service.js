'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serviceLogger = serviceLogger;

var _winston = require('winston');

var _transports = require('../transports');

_winston.loggers.add('service', {
    transports: [_transports.transportConsole, _transports.serviceTransport, _transports.debugTransport]
});

const serviceLog = _winston.loggers.get('service');

function serviceLogger(module) {
    return {
        debug: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            serviceLog.debug.apply(serviceLog, fullParams);
        },
        info: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            serviceLog.info.apply(serviceLog, fullParams);
        },
        warn: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            serviceLog.warn.apply(serviceLog, fullParams);
        },
        error: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            serviceLog.error.apply(serviceLog, fullParams);
        }
    };
}