'use strict';

var _app = require('./app');

var _logger = require('../logger');

const PORT = process.env.PORT || 3000;
(0, _app.config)(process.env.PROJECT_PATH || '/Users/geng/Project/Person/node-work/app/dist');
_app.app.listen(PORT, () => {
  (0, _logger.serviceLogger)('server:serv').info(`App is listening on ${PORT}`);
});
_app.app.on('error', (err, ctx) => {
  (0, _logger.serviceLogger)('server:serv').error(`server error`, err);
});