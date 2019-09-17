'use strict';
const pm2 = require('pm2')
module.exports = (program) => {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        pm2.stop(program.procss || 'all', function (err, apps) {
            pm2.disconnect();
            if (err) log(chalk.red(err))
        })
    })
}