
import sampleQueue from "../queues/sampleQueue";


export default async function (name:string ,payload: Record<string, unknown>)   {

    await sampleQueue.add(name,payload ) ;
    console.log("suscessfully added job to the queue");
}