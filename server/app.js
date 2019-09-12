const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require("koa-static");
const morgan = require('koa-morgan')
const api = require('../api')
const app = new Koa()

app.use(bodyParser())
app.use(static(path.resolve(__dirname, "../static/")));

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(async (ctx, next) => {
    try {
        await next()
        if (ctx.status === 404) {
            ctx.body = 404
        }
    } catch (err) {
        // handle error
    }
})

app.use(api.routes(), api.allowedMethods())

module.exports = app