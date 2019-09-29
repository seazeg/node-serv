'use strict';
const pm2 = require('pm2')

process.env.PM2_USAGE = 'CLI'
module.exports = (program) => {
    pm2.list()
    setTimeout(() => {
        process.env.PM2_USAGE = 'NOCLI'
    }, 500);
}