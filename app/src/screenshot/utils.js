import { stat, mkdir as _mkdir } from 'fs';
import { parse } from 'path';
import { daoLogger } from '../../../g2m/lib'

function getStat(path) {
    return new Promise((resolve, reject) => {
        stat(path, (err, stats) => {
            if (err) {
                daoLogger('app:screenshot').error('目标目录不存在..',err)
                resolve(false);
            } else {
                resolve(stats);
            }
        })
    })
}


function mkdir(dir) {
    return new Promise((resolve, reject) => {
        _mkdir(dir, err => {
            if (err) {
                daoLogger('app:screenshot').error('目录创建失败..',err)
                resolve();
            } else {
                daoLogger('app:screenshot').info('目录创建成功..')
                resolve(true);
            }
        })
    })
}


async function dirExists(dir) {
    if(!!dir){
        let isExists = await getStat(dir);
        //如果该路径且不是文件，返回true
        if (isExists && isExists.isDirectory()) {
            return true;
        } else if (isExists) { //如果该路径存在但是文件，返回false
            return false;
        }
        //如果该路径不存在
        let tempDir = parse(dir).dir; //拿到上级路径
        //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
        let status = await dirExists(tempDir);
        let mkdirStatus;
        if (status) {
            mkdirStatus = await mkdir(dir);
        }
        return mkdirStatus;
    }
}

export default dirExists