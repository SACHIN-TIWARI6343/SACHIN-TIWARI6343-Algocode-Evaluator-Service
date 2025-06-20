
//import Docker from 'dockerode';

//import { TestCases } from '../types/testCases';

import createDockerContainer from './containersFactory';
import { PYTHON_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';


async function runPython(code:string,inputTestCase:string ){
     
    const rawlogBUffer: Buffer[] = [];

   
        console.log("Initialising a new python docker container");
        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
        console.log(runCommand);
        // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']); 
        const runPythonDockerContainer = await createDockerContainer(PYTHON_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]); 
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

    await new Promise((resolve) => {
    loggerStream.on('end', () => {
        console.log(rawlogBUffer);
        const completeBuffer = Buffer.concat(rawlogBUffer);
        const decodeStream= decodeDockerStream(completeBuffer);
        console.log(decodeStream);
        resolve(decodeStream);
    });
})

   
   await runPythonDockerContainer.remove();

    
}
export default  runPython;