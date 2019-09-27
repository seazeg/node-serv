'use strict';
import pm2 from 'pm2';
import log from '../../utils/console';

export const g2m = {
    run: (config) => {
        pm2.connect(function (err) {

            if (err) {
                log.error(err)
                process.exit(2)
            }
            let baseConf = {
                'apps': [{
                    'script': require('path').resolve(__dirname, 'serv.js'),
                }]
            }

            baseConf.apps = Object.assign(baseConf.apps[0], config || {})
            pm2.start(baseConf, function (err, apps) {
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

                log.info(`::App is listening on ${baseConf.apps.env.PORT||3000}::\n`)
                // pm2.disconnect();
                // if (err) log.error(err)
            });
        });
    }
}