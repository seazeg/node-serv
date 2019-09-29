import { transports } from 'winston';
import { formatter, timestampFormatter } from './formatter';
import 'winston-daily-rotate-file';

export const transport = (conf) => {
    const baseConf = {
        json: conf.json || false,
        maxSize: conf.maxSize || 1024 * 1024 * 10,
        maxFiles: conf.maxFiles || '7d',
        timestamp: timestampFormatter,
        datePattern: conf.datePattern || 'YYYY-MM-DD',
        zippedArchive: conf.zippedArchive || true,
        prepend: conf.prepend || true,
        dirname: conf.dirname || require('path').resolve(__dirname, '../../../../logs/%DATE%'),
        level: conf.level || 'debug'
    }
    const transportConsole = new transports.Console({
        json: false,
        prettyPrint: true,
        colorize: true,
        level: 'info',
        timestamp: timestampFormatter,
        formatter: formatter,
        handleExceptions: true,
        datePattern: 'YYYY-MM-DD'
    });
    
    const debugTransport = new transports.DailyRotateFile(Object.assign({
        name: 'full',
        filename: 'ALL-%DATE%.log',
        handleExceptions: true
    }, baseConf));
    
    const serviceTransport = new transports.DailyRotateFile(Object.assign({
        name: 'service',
        filename: 'service-%DATE%.log'
    }, baseConf));
    
    const daoTransport = new transports.DailyRotateFile(Object.assign({
        name: 'dao',
        filename: 'dao-%DATE%.log'
    }, baseConf));

    return {
        transportConsole: transportConsole,
        debugTransport: debugTransport,
        serviceTransport: serviceTransport,
        daoTransport: daoTransport
    }
}
