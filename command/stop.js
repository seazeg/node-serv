'use strict';
const pm2 = require('pm2')
const {serviceLogger} = require('../libs/logger')

module.exports = (program) => {
    pm2.connect(function (err) {
        if (err) {
            serviceLogger('cmd:stoped').error(err)
            process.exit(2);
        }
        pm2.stop(program.process || 'all', function (err, apps) {
            pm2.disconnect();
            if (err) serviceLogger('cmd:stoped').error(err)
        })
        serviceLogger('cmd:stoped').info(`The process whose name or ID is ${program.process||'all'} has stoped`)
    })
}