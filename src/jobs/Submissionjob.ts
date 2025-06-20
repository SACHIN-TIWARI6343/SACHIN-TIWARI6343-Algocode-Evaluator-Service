import { Job } from "bullmq";

import { Ijob } from "../types/bullmqjobdefination";
import { SubmissionPayload } from "../types/submissionpaylod";
import runCpp from "../containers/runCpp";


export default class SubmissionJob implements Ijob {
    name: string;
    payload: Record<string, SubmissionPayload>;

    constructor( payload: Record<string, SubmissionPayload>) {
        this.name = this.constructor.name; // This will be the name of the job class
        this.payload = payload;// Store the payload for the job
    }

    handle = async ( job?:Job) => {
       console.log("Handler of the JOb called");
       console.log(this.payload);
       if(job) {
         
          const key = Object.keys(this.payload)[0];
          console.log(this.payload[key].language);
          if(this.payload[key].language === "CPP") {
           const response=  await runCpp(this.payload[key].code, this.payload[key].testCases);
           console.log("Evaluated Response:", response);
          }
       }
    };

    failed = (job?: Job): void=> {
        console.log("job failed");
        if (job) {
            console.log(`Job ${job.id} failed with error: ${job.failedReason}`);
        } else {
            console.log("No job information available.");
        }   
    };
}  