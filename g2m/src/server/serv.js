import { app, register } from './app';
import { loggerConfig } from '../logger';

const PORT = process.env.PORT || 5257

const run = () => {
  register(process.env.PROJECT_PATH);
  loggerConfig({
    dirname:process.env.LOGGER_PATH
  })

  app.listen(PORT)
  app.on('error', (err, ctx) => {
    log.error(`server error`, err)
  });
}

if (process.env.PROJECT_PATH) run();

export default run