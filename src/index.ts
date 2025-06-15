import express, { Express } from 'express';
import serverConfig from './config/serverConfig';
import apirouter from './routes';
import samplequeueproducer from './producer/samplequeueproducer';
import SampleWorker from './workers/SampleWorker';


const app:Express = express();

app.use('/api',apirouter);


app.listen(serverConfig.port, () => {
  console.log('Server is running on port  3000');

  SampleWorker('sampleQueue');
  samplequeueproducer('SampleJob',{
    name:"Sachin Tiwari",
    company:"Google",
    Position:"Software Engineer",
    location:" Banglore "
  });
});