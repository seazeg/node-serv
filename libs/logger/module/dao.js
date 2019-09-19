'use strict';
const winston = require('winston');
const {
    transportConsole,
    daoTransport,
    debugTransport
} = require('../transports')

winston.loggers.add('dao', {
    transports: [
        transportConsole,
        daoTransport,
        debugTransport
    ],
});

const daoLog = winston.loggers.get('dao');

exports.daoLogger = (module) => {
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
};