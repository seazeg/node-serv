'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.g2m = undefined;

var _pm = require('pm2');

var _pm2 = _interopRequireDefault(_pm);

var _console = require('../../utils/console');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const g2m = exports.g2m = {
    run: config => {
        _pm2.default.connect(function (err) {

            if (err) {
                _console2.default.error(err);
                process.exit(2);
            }
            let baseConf = {
                'apps': [{
                    'script': require('path').resolve(__dirname, 'serv.js')
                }]
            };

            baseConf.apps = Object.assign(baseConf.apps[0], config || {});
            _pm2.default.start(baseConf, function (err, apps) {
                _console2.default.info(`
             ██████╗ ██████╗ ███╗   ███╗
            ██╔════╝ ╚════██╗████╗ ████║
            ██║  ███╗ █████╔╝██╔████╔██║
            ██║   ██║██╔═══╝ ██║╚██╔╝██║
            ╚██████╔╝███████╗██║ ╚═╝ ██║
             ╚═════╝ ╚══════╝╚═╝     ╚═╝
                                        
            ███████╗██╗   ██╗ █████╗ ███╗   ██╗    ██████╗ 
            ██╔════╝██║   ██║██╔══██╗████╗  ██║   ██╔════╝ 
            █████╗  ██║   ██║███████║██╔██╗ ██║   ██║  ███╗
            ██╔══╝  ╚██╗ ██╔╝██╔══██║██║╚██╗██║   ██║   ██║
            ███████╗ ╚████╔╝ ██║  ██║██║ ╚████║██╗╚██████╔╝
            ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝ 
              `);

                _console2.default.info(`::App is listening on ${baseConf.apps.env.PORT || 3000}::\n`);
                // pm2.disconnect();
                // if (err) log.error(err)
            });
        });
    }
};