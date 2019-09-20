import { request, summary, tags, query, body, prefix } from 'koa-swagger-decorator'
import run from './screenshot/core';
import { blue } from 'chalk';
const log = console.log;

const tag = tags(['Node应用']);

@prefix('/nodeservice')
export default class Screenshot {
    @request('get', '/api/screenshot')
    @summary('截图功能')
    @tag
    @query({
        hostName: { type: 'string', description: '目标域名' },
        devic: { type: 'string', description: '终端类型' },
        storagePath: { type: 'string', description: '输出路径' }
    })
    async screenshot(ctx) {
      return new Promise(function (resolve, reject) {
        const { hostName,devic,storagePath } = ctx.validatedQuery;
        log('获取参数：', blue(JSON.stringify({ hostName,devic,storagePath })))
        run({hostName,devic,storagePath}).then(function (result) {
            ctx.body = result
            resolve();
        })
        
    });
 }
}
