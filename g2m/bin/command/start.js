'use strict';
const pm2 = require('pm2')
const fs = require('fs')
const path = require('path')
const log = require('../../utils/console')

module.exports = (program) => {
  pm2.connect(function (err) {
    if (err) {
      log.error(err)
      process.exit(2)
    }
    let config = {},
      opts = {
        "apps": [{
          "script": path.resolve(__dirname, "../../lib/server/serv.js"),
        }]
      }

    program.config ? config = JSON.parse(fs.readFileSync(path.resolve(program.config)), 'utf-8') : null

    opts.apps = Object.assign(opts.apps[0], config)

    pm2.start(opts, function (err, apps) {
      log.info(`
     ██████╗ ██████╗ ███╗   ███╗
    ██╔════╝ ╚════██╗████╗ ████║
    ██║  ███╗ █████╔╝██╔████╔██║
    ██║   ██║██╔═══╝ ██║╚██╔╝██║
    ╚██████╔╝███████╗██║ ╚═╝ ██║
     ╚═════╝ ╚══════╝╚═╝     ╚═╝
                                
    ███████╗██╗   ██╗ █████╗ ███╗   ██╗    ██████╗ 
    ██╔════╝██║   ██║██╔══██╗████╗  ██║   ██╔════╝ 
    █████╗  ██║   ██║███████║██╔██╗ ██║   ██║  ███╗
    ██╔══╝  ╚██╗ ██╔╝██╔══██║██║╚██╗██║   ██║   ██║
    ███████╗ ╚████╔╝ ██║  ██║██║ ╚████║██╗╚██████╔╝
    ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝ 
      `)

      log.info(`::App is listening on ${config.env.PORT}::\n`)
      pm2.disconnect();
      if (err) log.error(err)
    });
  });

}