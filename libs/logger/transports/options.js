'use strict';
const winston = require('winston');
const moment = require('moment');

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

exports.timestampFormatter = () => {
    return moment().format('YYYY-MM-DD HH:MM:ss.SSS');
};