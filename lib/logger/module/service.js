'use strict';
const winston = require('winston');
const {
    transportConsole,
    serviceTransport,
    debugTransport
} = require('../transports')

winston.loggers.add('service', {
    transports: [
        transportConsole,
        serviceTransport,
        debugTransport
    ],
});

const serviceLog = winston.loggers.get('service');

exports.serviceLogger = (module) => {
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
};