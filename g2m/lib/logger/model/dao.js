'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.daoConfig = undefined;
exports.daoLogger = daoLogger;

var _winston = require('winston');

var _transports = require('../transports');

let daoLog = {};

const daoConfig = exports.daoConfig = conf => {
    _winston.loggers.add('dao', {
        transports: [(0, _transports.transport)(conf).transportConsole, (0, _transports.transport)(conf).serviceTransport, (0, _transports.transport)(conf).debugTransport]
    });
    daoLog = _winston.loggers.get('dao');
};

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