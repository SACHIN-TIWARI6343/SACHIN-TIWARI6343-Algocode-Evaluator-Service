
//import Docker from 'dockerode';

//import { TestCases } from '../types/testCases';

import createDockerContainer from './containersFactory';
import { CPP_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';
import pullImage from './PullImage';


async function runCpp(code:string,inputTestCase:string ){
     
    const rawlogBUffer: Buffer[] = [];

   
        console.log("Initialising a new cpp docker container");

       await pullImage(CPP_IMAGE);

      const runCommand = `
      echo '${code.replace(/'/g, `'\\''`)}' > main.cpp && \
      g++ main.cpp && \
     echo '${inputTestCase.replace(/'/g, `'\\''`)}' | ./a.out
`;



       console.log(runCommand);
        // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']); 
        const cppDockerContainer = await createDockerContainer(CPP_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]); 
    // Start the container
    await cppDockerContainer.start();
  
   
     
    const loggerStream = await cppDockerContainer.logs({

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

   
  await cppDockerContainer.remove();

    
}
export default runCpp