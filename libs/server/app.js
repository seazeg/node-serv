'use strict';
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
// const stat = require("koa-static");
const cors = require("koa2-cors");
const morgan = require('koa-morgan')
const {
    router,
    config
} = require('./service')
const {
    serviceLogger
} = require('../logger')
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

module.exports = {
    app: app,
    config: config
}