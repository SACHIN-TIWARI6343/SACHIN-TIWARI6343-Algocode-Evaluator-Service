console.log("starting");

import bodyParser from 'body-parser';


import express, { Express } from 'express';
import serverConfig from './config/serverConfig';
import apirouter from './routes';
//import samplequeueproducer from './producer/samplequeueproducer';
import SampleWorker from './workers/SampleWorker';

import runJava from './containers/runJavaDocker';


import runPython from './containers/runPythonDocker';
//import runCpp from './containers/runCpp';
import SubmissionWorker from './workers/submissionWorker';
import submissionQueuProducer from './producer/submissionQueuProducer';
import samplequeueproducer from './producer/samplequeueproducer';



const app:Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));   
app.use(bodyParser.text());


app.use('/api',apirouter);

console.log("hii");
app.listen(serverConfig.port, () => {
  console.log('Server is running on port  3000');


   SampleWorker('sampleQueue');
   SubmissionWorker('SubmissionQeue');

  samplequeueproducer('SampleJob',{
    name:"Sachin Tiwari",
    company:"Google",
    Position:"Software Engineer",
    location:" Banglore "
  });

  
const pythoncode = `x = input()
print("value of x is", x)`;

const javacode = `
import java.util.*;
public class Main {
    public static void main(String[] args) {
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        String x = scanner.nextLine();
        System.out.println("value of y  is " + x);
    }
}

`
const cppcode = `#include <iostream>
using namespace std; 

int main() {
    string x;
    cin >> x;
    cout << "value of z is " << x << endl;
    return 0;
} 
`
  const inputCase=`10`;
 submissionQueuProducer('SubmissionJob', {
  "123": {
    language: "CPP",
    testCases: inputCase,
    code: cppcode    
  }
});


   //runPython(pythoncode, "100");
   //runJava(javacode, "100" );
   //runCpp(cppcode, "100" );
});