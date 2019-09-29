'use strict';
const shell = require('shelljs')
module.exports = (program) => {
    shell.exec(`${require('path').resolve(__dirname,'../../node_modules/pm2/bin/pm2')} logs --format`)
}

