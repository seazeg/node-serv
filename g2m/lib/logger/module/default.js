'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultConfig = undefined;
exports.logger = logger;

var _winston = require('winston');

var _transports = require('../transports');

let defaultLog = {};

const defaultConfig = exports.defaultConfig = conf => {
    _winston.loggers.add('default', {
        transports: [(0, _transports.transport)(conf).transportConsole, (0, _transports.transport)(conf).serviceTransport, (0, _transports.transport)(conf).debugTransport]
    });
    defaultLog = _winston.loggers.get('default');
};

function logger(module) {
    return {
        debug: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            defaultLog.debug.apply(defaultLog, fullParams);
        },
        info: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            defaultLog.info.apply(defaultLog, fullParams);
        },
        warn: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            defaultLog.warn.apply(defaultLog, fullParams);
        },
        error: (...args) => {
            const meta = {
                module
            };
            const fullParams = args.concat(meta);
            defaultLog.error.apply(defaultLog, fullParams);
        }
    };
}