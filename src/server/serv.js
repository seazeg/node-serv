'use strict';
import { app, config } from './app';

const PORT = process.env.PORT || 3000
config(process.env.PROJECT_PATH || '/Users/geng/Project/Person/node-work/app/dist');
app.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT}`)
})