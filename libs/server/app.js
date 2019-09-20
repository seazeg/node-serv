'use strict';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
// const stat = require("koa-static");
import cors from "koa2-cors";
import morgan from 'koa-morgan';
import { router, config } from './service';
import { serviceLogger } from '../logger';
const app = new Koa()

app
    .use(bodyParser())
    .use(cors())
    .use(morgan('[:remote-addr] - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
    .use(async (ctx, next) => {
        try {
            await next()
            if (ctx.status === 404) {
                ctx.body = 404
                serviceLogger('server:app').warn('No page found and jump to 404')
            }
        } catch (err) {
            serviceLogger('server:app').error(err)
        }
    })
    .use(router.routes(), router.allowedMethods())

export {
    app as app,
    config as config
}