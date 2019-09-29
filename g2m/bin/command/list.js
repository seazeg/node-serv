'use strict';
const pm2 = require('pm2')

module.exports = (program) => {
    process.env.PM2_USAGE = 'CLI'
    pm2.list()
    process.env.PM2_USAGE = 'NOCLI'
}