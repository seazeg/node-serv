'use strict';
const pm2 = require('pm2')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const log = console.log;
const {
  defaultLogger
} = require('../libs/logger')

module.exports = (program) => {
  pm2.connect(function (err) {
    if (err) {
      defaultLogger().error(err)
      process.exit(2)
    }
    let config = {}
    let opts = {
      "apps": [{
        "script": path.resolve(__dirname,"../server/serv.js"),
      }]
    }
    program.config ? config = JSON.parse(fs.readFileSync(path.resolve(program.config)), 'utf-8') : null

    opts.apps = Object.assign(opts.apps[0], config)

    pm2.start(opts, function (err, apps) {
      pm2.disconnect(); // Disconnects from PM2
      if (err) defaultLogger().error(err)
    });

    pm2.describe('dev-server');


    log(chalk.green(`
  ███████╗██╗   ██╗ █████╗ ███╗   ██╗    ██████╗ 
  ██╔════╝██║   ██║██╔══██╗████╗  ██║   ██╔════╝ 
  █████╗  ██║   ██║███████║██╔██╗ ██║   ██║  ███╗
  ██╔══╝  ╚██╗ ██╔╝██╔══██║██║╚██╗██║   ██║   ██║
  ███████╗ ╚████╔╝ ██║  ██║██║ ╚████║██╗╚██████╔╝
  ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝
  `))

    log(chalk.green(`Visit http://localhost:${config.env.PORT}`))
  });
}