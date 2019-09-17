'use strict';
const chalk = require('chalk')
const log = console.log;
const {
  app,
  config
} = require('./app');

const PORT = process.env.PORT || 3000
config(process.env.PROJECT_PATH);
app.listen(PORT, () => {
  log(chalk.green(`Visit http://localhost:${PORT}`))
})



