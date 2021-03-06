'use strict';
const pm2 = require('pm2')
const log = require('../../utils/console')

module.exports = (program) => {
    pm2.connect(function (err) {
        if (err) {
            log.warn(err)
            process.exit(2);
        }
        pm2.dashboard();
    })
}