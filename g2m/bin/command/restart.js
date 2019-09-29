'use strict';
const pm2 = require('pm2')
const log = require('../../utils/console')

module.exports = (program) => {
    process.env.PM2_USAGE = 'CLI'
    pm2.connect(function (err) {
        if (err) {
            log.error(err)
            process.exit(2);
        }
        pm2.restart(program.pid || 'all', function (err, apps) {
            if (err) {
                log.error(err)
            } else {
                log.info(`Successful >> The process whose name or ID is [${program.pid||'all'}] has restart`)
            }
            pm2.disconnect();
        })
        setTimeout(() => {
            process.env.PM2_USAGE = 'CLI'
            pm2.list()
            process.env.PM2_USAGE = 'NOCLI'
        }, 1000);
    })

}