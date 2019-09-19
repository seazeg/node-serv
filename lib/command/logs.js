'use strict';
const pm2 = require('pm2')
const {serviceLogger} = require('../logger')

module.exports = (program) => {
    // pm2.connect(function (err) {
    //     if (err) {
    //         serviceLogger('cmd:deleted').error(err)
    //         process.exit(2)
    //     }
    //     pm2.delete(program.process || 'all', function (err, apps) {
    //         pm2.disconnect();
    //         if (err) serviceLogger('cmd:deleted').error(err)
    //     })
    //     serviceLogger('cmd:deleted').info(`The process whose name or ID is ${program.process||'all'} has deleted`)
    // })
}