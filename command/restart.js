'use strict';
const pm2 = require('pm2')
const {defaultLogger} = require('../libs/logger')

module.exports = (program) => {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        pm2.restart(program.process || 'all', function (err, apps) {
            pm2.disconnect();
            if (err) log(chalk.red(err))
        })
        defaultLogger().info(`The process whose name or ID is ${program.process||'all'} has restart`)
    })
}