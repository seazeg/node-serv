import { decorators, daoLogger}  from '../../g2m/lib'
import screenshotCore from './screenshot/core';
import btSpiderCore from './bt_spider/';

const {request, summary, tags, query, body, prefix} = decorators
const tag = tags(['Node应用']);

@prefix('/api')
export default class NodeApp {

    /**
     * @description 截图功能
     * @param {String} hostName 目标域名
     * @param {String} devic 终端类型
     * @param {String} storagePath 输出路径
     * @returns 
     */
    @request('post', '/screenshot')
    @summary('截图功能')
    @tag
    @query({
        hostName: { type: 'string', description: '目标域名' },
        devic: { type: 'string', description: '终端类型' },
        storagePath: { type: 'string', description: '输出路径' }
    })
    async screenshot(ctx) {
      return new Promise(function (resolve, reject) {
        const { hostName, devic, storagePath } = ctx.validatedQuery;
        daoLogger('app:screenshot').info('获取参数：', JSON.stringify({ hostName, devic, storagePath }))
        screenshotCore({ hostName, devic, storagePath }).then(function (result) {
            ctx.body = result
            resolve();
        })
      });
    }


    
}
