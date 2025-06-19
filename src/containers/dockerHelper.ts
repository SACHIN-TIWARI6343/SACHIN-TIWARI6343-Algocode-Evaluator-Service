import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";


 export default function decodeDockerStream( buffer :Buffer ) : DockerStreamOutput {
    // Decode the buffer to a string
    let offset = 0; // it is to keep track current position of buffer 

    // the output that will store the accumulate stout and stderr output as strig
    const output: DockerStreamOutput = {stdout:'', stderr:''};

    // loop  untill offset end

    while (offset < buffer.length) {
        // Read the header
       
        const channel= buffer[offset] ;

        const length = buffer.readUInt32BE(offset + 4); // Read the next 4 bytes as an unsigned integer

       // as now read the haddr , move forword 
        offset += DOCKER_STREAM_HEADER_SIZE; // Move past the header (8 bytes)

        if(channel == 1)
        {
            // stdout stream 
            output.stdout += buffer.toString('utf8', offset, offset + length);

            
        }else if(channel == 2)
        {
            // stderr stream 
            output.stderr += buffer.toString('utf8', offset, offset + length);

        }
    
    offset += length; // Move past the data
    }
    return output;

}