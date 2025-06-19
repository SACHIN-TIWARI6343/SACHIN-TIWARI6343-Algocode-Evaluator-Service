import { Job } from "bullmq";

import { Ijob } from "../types/bullmqjobdefination";


export default class SampleJob implements Ijob {
    name: string;
    payload: Record<string, unknown>;

    constructor( payload: Record<string, unknown>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle =( job?:Job) => {
       console.log("Handler of the JOb called");
       if(job) {
           console.log(`Job ID: ${job.id}`);
           console.log(`Job Name: ${job.name}`);
           console.log(`Job Data:`, job.data);
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