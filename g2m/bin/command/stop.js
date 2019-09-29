'use strict';
const pm2 = require('pm2')
const log = require('../../utils/console')

module.exports = (program) => {
    pm2.connect(function (err) {
        if (err) {
            log.error(err)
            process.exit(2);
        }
        pm2.stop(program.pid || 'all', function (err, apps) {
            pm2.disconnect();
            if (err) {
                log.error(err)
            } else {
                log.info(`Successful >> The process whose name or ID is [${program.pid||'all'}] has stoped`)
            }
        })
        setTimeout(() => {
            process.env.PM2_USAGE = 'CLI'
            pm2.list()
            process.env.PM2_USAGE = 'NOCLI'
        }, 1000);
    })
    pm2.list()
}