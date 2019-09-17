'use strict';
const pm2 = require('pm2')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const log = console.log;

module.exports = (program) => {
  pm2.connect(function (err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    let config = JSON.parse(fs.readFileSync(path.resolve('../server/config/serv.config.json')), 'utf-8')

    program.config ? config = JSON.parse(fs.readFileSync(path.resolve(program.config)), 'utf-8') : null

    pm2.start(Object.assign({
      'script': '../server/serv.js',
      'watch': ['../server'],
      'ignore_watch': ['../node_modules', '../logs', '../test']
    }, config), function (err, apps) {
      pm2.disconnect(); // Disconnects from PM2
      if (err) log(chalk.red(err))
    });

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