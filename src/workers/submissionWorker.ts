

import redisConnection from "../config/redisConfig";
import SubmissionJob from "../jobs/Submissionjob";

import { Job,Worker } from "bullmq";

export default function SubmissionWorker(queuename :string)
{
   console.log("Submission Worker is starting for queue:", queuename);
      new Worker( // create a worker for the sample queue
       queuename, // 1st parameter 
       async (job:Job)=>{                          // 2nd parameter 
         
        console.log("sample job worker kiking",job);
        if(job.name == "SubmissionJob"){
             const submissionJob =new SubmissionJob(job.data);     
             submissionJob.handle(job);
             return true;
       }
      },
      {
         connection:redisConnection, // 3rd parameter
      }
    );
}