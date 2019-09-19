'use strict';
const {
  defaultLogger
} = require('../libs/logger')
const {
  app,
  config
} = require('./app');

const PORT = process.env.PORT || 3000
config(process.env.PROJECT_PATH);
app.listen(PORT, () => {
  defaultLogger().info(`Visit http://localhost:${PORT}`)
})



