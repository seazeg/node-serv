'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serviceConfig = undefined;
exports.serviceLogger = serviceLogger;

var _winston = require('winston');

var _transports = require('../transports');

let serviceLog = {};

const serviceConfig = exports.serviceConfig = conf => {
    _winston.loggers.add('service', {
        transports: [(0, _transports.transport)(conf).transportConsole, (0, _transports.transport)(conf).serviceTransport, (0, _transports.transport)(conf).debugTransport]
    });
    serviceLog = _winston.loggers.get('service');
};

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