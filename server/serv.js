'use strict';
const {
  app,
  config
} = require('./app');

const PORT = process.env.PORT || 3000
config(process.env.PROJECT_PATH);
app.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT}`)
})