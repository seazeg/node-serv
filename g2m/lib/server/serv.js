'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('./app');

var _logger = require('../logger');

var _console = require('../../utils/console');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 5257;

const run = (conf = {
  PROJECT_PATH: '',
  LOGGER_PATH: ''
}) => {
  (0, _app.register)(conf.PROJECT_PATH || process.env.PROJECT_PATH);
  (0, _logger.loggerConfig)({
    dirname: conf.LOGGER_PATH || process.env.LOGGER_PATH
  });

  _app.app.listen(PORT);
  _app.app.on('error', (err, ctx) => {
    _console2.default.error(`server error`, err);
  });
};

if (process.env.PROJECT_PATH) run();

exports.default = run;