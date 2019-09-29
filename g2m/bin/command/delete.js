'use strict';
const pm2 = require('pm2')
const log = require('../../utils/console')

module.exports = (program) => {
    pm2.connect(function (err) {
        if (err) {
            log.error(err)
            process.exit(2)
        }
        pm2.delete(program.process || 'all', function (err, apps) {
            pm2.disconnect();
            if (err) log.error(err)
        })
        log.info(`Successful >> The process whose name or ID is [${program.process||'all'}] has deleted`)
    })
}