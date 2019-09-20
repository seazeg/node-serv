'use strict';
import { app, config } from './app';

const PORT = process.env.PORT || 3000
config(process.env.PROJECT_PATH || require('path').resolve(__dirname,'../../src'));
app.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT}`)
})