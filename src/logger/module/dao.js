'use strict';
import { loggers } from 'winston';
import { transportConsole, daoTransport, debugTransport } from '../transports';

loggers.add('dao', {
    transports: [
        transportConsole,
        daoTransport,
        debugTransport
    ],
});

const daoLog = loggers.get('dao');

export function daoLogger(module) {
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