'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loggerConfig = undefined;

var _dao = require('./dao');

var _default = require('./default');

var _service = require('./service');

const loggerConfig = exports.loggerConfig = conf => {
    (0, _dao.daoConfig)(conf);
    (0, _default.defaultConfig)(conf);
    (0, _service.serviceConfig)(conf);
};