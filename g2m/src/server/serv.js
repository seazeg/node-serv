import { app, config } from './app';
import { serviceLogger } from '../logger';

const PORT = process.env.PORT || 3000
config(process.env.PROJECT_PATH || '/Users/geng/Project/Person/node-work/app/dist');
app.listen(PORT, () => {
  serviceLogger('server:serv').info(`App is listening on ${PORT}`)
})  
app.on('error', (err, ctx) => {
  serviceLogger('server:serv').error(`server error`,err)
});