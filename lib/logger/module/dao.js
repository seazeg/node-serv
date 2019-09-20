'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.daoLogger = daoLogger;

var _winston = require('winston');

var _transports = require('../transports');

_winston.loggers.add('dao', {
    transports: [_transports.transportConsole, _transports.daoTransport, _transports.debugTransport]
});

const daoLog = _winston.loggers.get('dao');

function daoLogger(module) {
    return {
        debug: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            daoLog.debug.apply(daoLog, fullParams);
        },
        info: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            daoLog.info.apply(daoLog, fullParams);
        },
        warn: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            daoLog.warn.apply(daoLog, fullParams);
        },
        error: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            daoLog.error.apply(daoLog, fullParams);
        }
    };
}