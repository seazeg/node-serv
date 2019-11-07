'use strict';
import pm2 from 'pm2';
import log from '../../utils/console';
import conf from './config/serv.config.js'

export const g2m = {
    run: (config = conf) => {
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

                log.info(`::Visit to http://localhost:${baseConf.apps.env.PORT||3000}/nodeservice\n`)
                log.info(`::Swagger API http://localhost:${baseConf.apps.env.PORT||3000}/nodeservice/doc/swagger-api\n`)
                pm2.disconnect();
                if (err) log.error(err)
            });
        });
    }
}