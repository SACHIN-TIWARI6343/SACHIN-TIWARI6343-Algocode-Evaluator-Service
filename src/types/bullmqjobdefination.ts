import { Job } from "bullmq";


export interface Ijob {

    name: string;
    paylod?: Record<string, unknown>
    
    handle : (job?: Job) => void
    failed?: (job?: Job) => void;
}