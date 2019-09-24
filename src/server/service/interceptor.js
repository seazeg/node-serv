import { SwaggerRouter } from '../../../middleware';
import { serviceLogger } from '../../logger';
const router = new SwaggerRouter();

//前置拦截器
router.all('*', async (ctx, next) => {
    try {
        await next();
        serviceLogger('server:interceptor').info('接口前置拦截开启')
        //todo
    } catch (e) {
        ctx.throw(500, e);
    }
});

export default router