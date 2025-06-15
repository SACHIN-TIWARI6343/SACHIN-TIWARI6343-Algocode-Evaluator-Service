import express, { Express } from 'express';
import serverConfig from './config/serverConfig';
import apirouter from './routes';

const app:Express = express();

app.use('/api',apirouter);


app.listen(serverConfig.port, () => {
  console.log('Server is running on port  3000');
});