import { SwaggerRouter } from '../../../middleware/swagger';
import { serviceLogger } from '../../logger';
const router = new SwaggerRouter();

//前置拦截器
const interceptor = (callback) => {
    router.all('*', async (ctx, next) => {
        try {
            if (callback) callback();
            serviceLogger('server:interceptor').info('接口前置拦截开启')
            //todo
            await next();
        } catch (e) {
            ctx.throw(500, e);
        }
    });
    return router
}

export default interceptor