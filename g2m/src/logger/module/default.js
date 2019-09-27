import { loggers } from 'winston';
import { transport } from '../transports';

let defaultLog = {}

export const defaultConfig = (conf) => {
    loggers.add('default', {
        transports: [
            transport(conf).transportConsole,
            transport(conf).serviceTransport,
            transport(conf).debugTransport
        ],
    });
    defaultLog = loggers.get('default');
}


export function logger(module) {
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