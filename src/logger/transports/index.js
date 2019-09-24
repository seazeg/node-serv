import { transports } from 'winston';
import { formatter, baseConf, timestampFormatter } from './conf';
import 'winston-daily-rotate-file';


export const transportConsole = new transports.Console({
    json: false,
    prettyPrint: true,
    colorize: true,
    level: 'info',
    timestamp: timestampFormatter,
    formatter: formatter,
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD'
});

export const debugTransport = new transports.DailyRotateFile(Object.assign({
    name: 'full',
    filename: 'debug-%DATE%.log',
    level: 'debug',
    handleExceptions: true
}, baseConf));

export const serviceTransport = new transports.DailyRotateFile(Object.assign({
    name: 'service',
    filename: 'service-%DATE%.log',
    level: 'debug'
}, baseConf));

export const daoTransport = new transports.DailyRotateFile(Object.assign({
    name: 'dao',
    filename: 'dao-%DATE%.log',
    level: 'debug'
}, baseConf));