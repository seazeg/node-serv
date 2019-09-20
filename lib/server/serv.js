'use strict';

var _app = require('./app');

const PORT = process.env.PORT || 3000;
(0, _app.config)(process.env.PROJECT_PATH || '/Users/geng/Project/Person/node-work/app/dist');
_app.app.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT}`);
});