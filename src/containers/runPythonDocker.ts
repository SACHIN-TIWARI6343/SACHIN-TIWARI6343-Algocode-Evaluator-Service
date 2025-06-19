
//import Docker from 'dockerode';

//import { TestCases } from '../types/testCases';

import createDockerContainer from './containersFactory';
import { PYTHON_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';


async function runPythonDocker(code:string,inputTestCases:string ){
     
    const rawlogBUffer: Buffer[] = [];

   console.log("STARTED  CONTAINER");

    // Escape double quotes from code for safe shell execution
  const safeCode = code.replace(/"/g, '\\"');
  const runCommand = [`sh`, `-c`, `echo "${inputTestCases}" | python -c "${safeCode}"`];

  const runPythonDockerContainer = await createDockerContainer(PYTHON_IMAGE, runCommand);

    // Start the container
    await runPythonDockerContainer.start();
  
   
     
    const loggerStream = await runPythonDockerContainer.logs({

        stdout:true, 
        stderr:true,
        timestamps:true,
        follow:true,
    });
    // attach events on the stream objects so that start and  stop reading can happen
    loggerStream.on('data', (chuck) => {
        rawlogBUffer.push(chuck);  
    });

    loggerStream.on('end', () => {
        console.log(rawlogBUffer);
        const completeBuffer = Buffer.concat(rawlogBUffer);
        const decodeStream= decodeDockerStream(completeBuffer);
        console.log(decodeStream);

    });
    console.log((rawlogBUffer));

    return runPythonDockerContainer; 
}
export default runPythonDocker;