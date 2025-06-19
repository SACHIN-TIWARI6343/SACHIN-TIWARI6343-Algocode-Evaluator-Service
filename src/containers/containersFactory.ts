import Docker from 'dockerode';


async function createDockerContainer(imagename:string ,cmdExecutable:string[]) {
     console.log("Inside createDockerContainer function");
    const docker = new Docker();
  
    
     const container = await docker.createContainer({
        Image: imagename,
        Cmd: cmdExecutable,
        Tty: false,
        AttachStdin:true, // to enlable input stream 
        AttachStdout: true,// to enable output stream
        AttachStderr: true,  // to enable error stream
        OpenStdin: true, // to enable stdin
        StdinOnce: true, // to allow stdin to be closed after the command is executed
     });
     return container;

     
    
}

export default createDockerContainer;