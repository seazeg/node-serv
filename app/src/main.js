import { decorators, daoLogger}  from '../../g2m/lib'
import screenshotCore from './screenshot/core';

const {request, summary, tags, query, body, prefix} = decorators
const tag = tags(['Node应用']);

@prefix('/api')
export default class NodeApp {

    /**
     * @description 截图功能
     * @param {String} hostName 目标域名
     * @param {String} devic 终端类型
     * @param {String} storagePath 输出路径
     * @param {Boolean} isSpm 是否标记SPM
     * @param {String} spmC SPMC参数
     * @param {Boolean} isAnnotated 是否包含SPMD
     * @returns 
     */
    @request('post', '/screenshot')
    @summary('截图功能')
    @tag
    @query({
        hostName: { type: 'string', description: '目标域名', default: 'https://www.haier.com/cn/'},
        devic: { type: 'string', description: '终端类型(14PC | iPad | iPhone 8 Plus)', default:'14PC'},
        storagePath: { type: 'string', description: '输出路径'},
        fileName: { type: 'string', description: '自定义名称'},
        isSpm: { type: 'boolean', description: '是否标记SPM', default: true},
        spmC: { type: 'string', description: 'SPMC参数', default:'news_20190920'},
        isAnnotated: { type: 'boolean', description: '是否包含SPMD', default: true}
    })
    async screenshot(ctx) {
      return new Promise(function (resolve, reject) {
        // const { hostName, devic, storagePath, fileName, isSpm, spmC, isAnnotated } = ctx.validatedQuery;
        daoLogger('app:screenshot').info('获取参数：', JSON.stringify({ ...ctx.validatedQuery }))
        screenshotCore({ ...ctx.validatedQuery }).then(function (result) {
            ctx.body = result
            resolve();
        })
      });
    }


    
}
