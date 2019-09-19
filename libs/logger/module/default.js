'use strict';
const winston = require('winston');
const {
    transportConsole,
    debugTransport
} = require('../transports')


winston.loggers.add('default', {
    transports: [
        transportConsole,
        debugTransport
    ],
});

const defaultLog = winston.loggers.get('default');

exports.defaultLogger = (module) => {
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
};