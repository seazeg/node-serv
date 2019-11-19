'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require('./app');

var _logger = require('../logger');

var _easyMonitor = require('easy-monitor');

var _easyMonitor2 = _interopRequireDefault(_easyMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 5257;

const run = () => {
  (0, _app.register)(process.env.PROJECT_PATH);
  (0, _logger.loggerConfig)({
    dirname: process.env.LOGGER_PATH
  });
  (0, _easyMonitor2.default)({
    project_name: 'G2M',
    auth: {
      need: true,
      /**
       @param {string} user 用户名
       @param {string} pass 用户键入密码
       @return {promise}
       **/
      authentication(user, pass) {
        return new Promise(resolve => {
          if (user === 'zhouergeng' && pass === 'trsadmin') resolve(true);else resolve(false);
        });
      }
    }
  });
  _app.app.listen(PORT);
  _app.app.on('error', (err, ctx) => {
    log.error(`server error`, err);
  });
};

if (process.env.PROJECT_PATH) run();

exports.default = run;