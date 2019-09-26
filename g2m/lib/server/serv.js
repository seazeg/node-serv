'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('./app');

var _logger = require('../logger');

const PORT = process.env.PORT || 3000;

const run = (conf = {
  PROJECT_PATH: '',
  LOGGER_PATH: require('path').resolve(__dirname, '../../../logs/%DATE%')
}) => {
  (0, _app.config)(process.env.PROJECT_PATH || conf.PROJECT_PATH || '/Users/geng/Project/Person/node-work/app/dist');
  (0, _logger.loggerConfig)({
    dirname: process.env.LOGGER_PATH || conf.LOGGER_PATH
  });

  _app.app.listen(PORT, () => {
    (0, _logger.serviceLogger)('server:serv').info(`App is listening on ${PORT}`);
  });
  _app.app.on('error', (err, ctx) => {
    (0, _logger.serviceLogger)('server:serv').error(`server error`, err);
  });
};

if (process.env.PROJECT_PATH) run();
exports.default = run;