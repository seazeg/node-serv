'use strict';
const chalk = require('chalk')
const log = console.log;
const app = require('./app');

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
  log(chalk.green(`
    ███████╗██╗   ██╗ █████╗ ███╗   ██╗    ██████╗ 
    ██╔════╝██║   ██║██╔══██╗████╗  ██║   ██╔════╝ 
    █████╗  ██║   ██║███████║██╔██╗ ██║   ██║  ███╗
    ██╔══╝  ╚██╗ ██╔╝██╔══██║██║╚██╗██║   ██║   ██║
    ███████╗ ╚████╔╝ ██║  ██║██║ ╚████║██╗╚██████╔╝
    ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝
`))
  log(chalk.green(`Visit http://localhost:${PORT}`))
})