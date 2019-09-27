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
        dirname: conf.dirname || require('path').resolve(__dirname, '../../../../logs/%DATE%')
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
        filename: 'debug-%DATE%.log',
        level: 'debug',
        handleExceptions: true
    }, baseConf));
    
    const serviceTransport = new transports.DailyRotateFile(Object.assign({
        name: 'service',
        filename: 'service-%DATE%.log',
        level: 'debug'
    }, baseConf));
    
    const daoTransport = new transports.DailyRotateFile(Object.assign({
        name: 'dao',
        filename: 'dao-%DATE%.log',
        level: 'debug'
    }, baseConf));

    return {
        transportConsole: transportConsole,
        debugTransport: debugTransport,
        serviceTransport: serviceTransport,
        daoTransport: daoTransport
    }
}
