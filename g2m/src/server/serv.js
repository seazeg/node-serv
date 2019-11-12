import { app, register } from './app';
import { serviceLogger, loggerConfig } from '../logger';

const PORT = process.env.PORT || 5257

const run = (conf = {
  PROJECT_PATH: '',
  LOGGER_PATH: ''
}) => {
  register(conf.PROJECT_PATH || process.env.PROJECT_PATH);
  loggerConfig({
    dirname:conf.LOGGER_PATH ||  process.env.LOGGER_PATH
  })

  app.listen(PORT)
  app.on('error', (err, ctx) => {
    serviceLogger('server:serv').error(`server error`, err)
  });
}



if (process.env.PROJECT_PATH) run();

export default run