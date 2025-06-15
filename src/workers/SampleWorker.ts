

import redisConnection from "../config/redisConfig";
import SampleJob from "../jobs/SampleJob";

import { Job,Worker } from "bullmq";

export default function SampleWorker(queuename :string)
{
  
      new Worker( // create a worker for the sample queue
       queuename, // 1st parameter 
       async (job:Job)=>{                          // 2nd parameter 
         
        console.log("sample job worker kiking",job);
        if(job.name == "SampleJob"){
            const samplejobInstance =new SampleJob(job.data);
           
             samplejobInstance.handle(job);
             return true;
       }
      },
      {
         connection:redisConnection, // 3rd parameter
      }
    );
}