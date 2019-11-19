import { app, register } from './app';
import { loggerConfig } from '../logger';
import easyMonitor from 'easy-monitor'

const PORT = process.env.PORT || 5257

const run = () => {
  register(process.env.PROJECT_PATH);
  loggerConfig({
    dirname:process.env.LOGGER_PATH
  })
  easyMonitor({
    project_name: 'G2M',
    auth: {
        need: true,
        /**
         @param {string} user 用户名
         @param {string} pass 用户键入密码
         @return {promise}
         **/
        authentication(user, pass) {
            return new Promise(resolve => {
                if ((user === 'zhouergeng' && pass === 'trsadmin')) resolve(true)
                else resolve(false);
            });
        }
    }
  });
  app.listen(PORT)
  app.on('error', (err, ctx) => {
    log.error(`server error`, err)
  });
}

if (process.env.PROJECT_PATH) run();

export default run