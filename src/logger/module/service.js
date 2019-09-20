'use strict';
import { loggers } from 'winston';
import { transportConsole, serviceTransport, debugTransport } from '../transports';

loggers.add('service', {
    transports: [
        transportConsole,
        serviceTransport,
        debugTransport
    ],
});

const serviceLog = loggers.get('service');

export function serviceLogger(module) {
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