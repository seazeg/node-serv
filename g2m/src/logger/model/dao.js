import { loggers } from 'winston';
import { transport } from '../transports';

let daoLog = {}

export const daoConfig = (conf) => {
    loggers.add('dao', {
        transports: [
            transport(conf).transportConsole,
            transport(conf).serviceTransport,
            transport(conf).debugTransport
        ],
    });
    daoLog = loggers.get('dao');
}

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