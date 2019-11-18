# g2m框架

## npm 全局安装

```javascript
npm i g2m -g
```

### 命令列表
> 启动服务
```shell
g2m start --config 配置文件绝对路径
```
> 停止服务
```shell
g2m stop -p PID
```
> 删除服务
```shell
g2m delete -p PID
```
> 重启服务
```shell
g2m restart -p PID
```
> 查看进程列表
```shell
g2m list
```
> 监控模式 
```shell
g2m monit
```
> 控制台打印日志
```shell
g2m logs
```

## API 引入
```shell
npm i g2m -S
```

### 启动
```javascript
//main.js
const { g2m } = require('g2m');

const config = {}
g2m.run(config)
```
### 服务路由写法

