
//import Docker from 'dockerode';

//import { TestCases } from '../types/testCases';

import createDockerContainer from './containersFactory';
import { JAVA_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';
import pullImage from './PullImage';


async function runJava(code:string,inputTestCase:string ){
     
    const rawlogBUffer: Buffer[] = [];

   
        console.log("Initialising a new java docker container");

        await pullImage(JAVA_IMAGE);
        const runCommand = `
        echo '${code.replace(/'/g, `'\\''`)}' > Main.java && 
        javac Main.java && 
        echo '${inputTestCase.replace(/'/g, `'\\''`)}' | java Main
`;

            
       console.log(runCommand);
        // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']); 
        const javaDockerContainer = await createDockerContainer(JAVA_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]); 
    // Start the container
    await javaDockerContainer.start();
  
   
     
    const loggerStream = await javaDockerContainer.logs({

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

   
   await javaDockerContainer.remove();

    
}
export default runJava