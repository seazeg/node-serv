import { loggers } from 'winston';
import { transportConsole, debugTransport } from '../transports';

loggers.add('default', {
    transports: [
        transportConsole,
        debugTransport
    ],
});

const defaultLog = loggers.get('default');

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