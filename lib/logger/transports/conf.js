'use strict';
const winston = require('winston');
const moment = require('moment');
const resolve = file => require('path').resolve(__dirname, file)


exports.timestampFormatter = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
};

exports.formatter = function (options) {
    const timestamp = options.timestamp();
    const level = options.level.toUpperCase();
    const message = options.message || '';
    let module = 'default';
    if (options.meta && options.meta.module) {
        module = options.meta.module;
    }
    let showMeta = false;
    let metaStr = '';
    if (options.meta && options.meta.stack) {
        showMeta = true;
        metaStr = JSON.stringify(options.meta);
    }
    const formatted = `[${timestamp}] [${level}] [${module}] - `;
    if (options.colorize) {
        const colorStr = winston.config.colorize(options.level, formatted);
        if (showMeta) {
            return `${colorStr}${message} stack: ${metaStr}`;
        }
        return `${colorStr}${message}`;
    }
    if (showMeta) {
        return `${formatted}${message} stack: ${metaStr}`;
    }
    return `${formatted}${message}`;
};

exports.baseConf = {
    json: false,
    maxSize: 1024 * 1024 * 10,
    maxFiles: '7d',
    timestamp: this.timestampFormatter,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    prepend: true,
    filename: resolve('../../../logs/apxxxsp/%DATE%')
}