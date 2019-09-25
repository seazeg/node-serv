import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from "koa2-cors";
import morgan from 'koa-morgan';
import favicon from 'koa-favicon';
import { router, config } from './service';
import { serviceLogger } from '../logger';
import staticFiles from 'koa-static';
import limit from 'koa2-ratelimit' 
const app = new Koa()

// const queue = [];
// app.use(async (ctx, next) => {
//  setTimeout(() => {
//   queue.shift()();
//  }, 3000);
//  await delay();
// });
// function delay() {
//  return new Promise((resolve, reject) => {
//   queue.push(resolve);
//  });
// }

app 
    .use(limit.RateLimit.middleware({
        interval: 5000, // 15 minutes = 15*60*1000
        max: 100, // limit each IP to 100 requests per interval
    }))
    .use(bodyParser())
    .use(cors())
    .use(favicon(__dirname + '../../../static/favicon.ico'))
    .use(staticFiles(require('path').join(__dirname + '../../../static')))
    .use(morgan('[:remote-addr] - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
    .use(async (ctx, next) => {
        try {
            await next()
            if (ctx.status === 404) {
                ctx.body = 'No page found and jump to 404'
                serviceLogger('server:app').warn('No page found and jump to 404')
            }
        } catch (err) {
            serviceLogger('server:app').error(err)
        }
    })
    .use(router.routes(), router.allowedMethods())

export {
    app,
    config
}