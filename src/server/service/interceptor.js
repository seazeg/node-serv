
const router = require("koa-router")()
import { serviceLogger } from '../../logger';

//前置拦截器
router.all('*', async (ctx, next) => {
    try {
        await next();
        serviceLogger('server:api').info('接口前置拦截开启')
        //todo
    } catch (e) {
        ctx.throw(500, e);
    }
});

export default router