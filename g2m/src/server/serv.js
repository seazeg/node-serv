import { app, config as appConfig } from './app';
import { serviceLogger, loggerConfig } from '../logger';

const PORT = process.env.PORT || 3000

const run = (conf = {
  PROJECT_PATH: '',
  LOGGER_PATH: require('path').resolve(__dirname, '../../../logs/%DATE%')
}) => {
  appConfig(process.env.PROJECT_PATH || conf.PROJECT_PATH || '/Users/geng/Project/Person/node-work/app/dist');
  loggerConfig({
    dirname: process.env.LOGGER_PATH || conf.LOGGER_PATH
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