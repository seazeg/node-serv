import { app, config as appConfig } from './app';
import { serviceLogger, loggerConfig } from '../logger';

const PORT = process.env.PORT || 3000

const run = (conf = {
  PROJECT_PATH: '',
  LOGGER_PATH: ''
}) => {
  appConfig(conf.PROJECT_PATH || process.env.PROJECT_PATH || '/Users/geng/Project/Person/node-work/app/dist');
  loggerConfig({
    dirname:conf.LOGGER_PATH ||  process.env.LOGGER_PATH
  })

  app.listen(PORT, () => {
    serviceLogger('server:serv').info(`App is listening on ${PORT}`)
  })
  app.on('error', (err, ctx) => {
    serviceLogger('server:serv').error(`server error`, err)
  });
}

if (process.env.PROJECT_PATH) run();

export default run