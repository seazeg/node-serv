'use strict';
const pm2 = require('pm2')
const {serviceLogger} = require('../../lib/logger')

module.exports = (program) => {
    pm2.connect(function (err) {
        if (err) {
            serviceLogger('cmd:restart').error(err)
            process.exit(2);
        }
        pm2.restart(program.process || 'all', function (err, apps) {
            pm2.disconnect();
            if (err) serviceLogger('cmd:restart').error(err)
        })
        serviceLogger('cmd:restart').info(`The process whose name or ID is ${program.process||'all'} has restart`)
    })
}