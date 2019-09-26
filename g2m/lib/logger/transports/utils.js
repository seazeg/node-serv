'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.timestampFormatter = timestampFormatter;
exports.formatter = formatter;

var _winston = require('winston');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function timestampFormatter() {
    return (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss.SSS');
}

function formatter(options) {
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
        const colorStr = _winston.config.colorize(options.level, formatted);
        if (showMeta) {
            return `${colorStr}${message} stack: ${metaStr}`;
        }
        return ` ${colorStr}${message}`;
    }
    if (showMeta) {
        return `${formatted}${message} stack: ${metaStr}`;
    }
    return ` ${formatted}${message}`;
}