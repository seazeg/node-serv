'use strict';
const pm2 = require('pm2')
const {serviceLogger} = require('../../lib/logger')

module.exports = (program) => {
    pm2.connect(function (err) {
        if (err) {
            serviceLogger('cmd:monit').error(err)
            process.exit(2);
        }
        pm2.dashboard();
    })
}