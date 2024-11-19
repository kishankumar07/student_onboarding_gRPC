import path from 'path'
import grpc from '@grpc/grpc-js'
import { fileURLToPath } from 'url';
import protoLoader from '@grpc/proto-loader'

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const packageDefinition = protoLoader.
                            loadSync(path.join(__dirname, '../protos/degree.proto'));
const degreeProto = grpc.loadPackageDefinition(packageDefinition);

const DEGREE = [
    {
        id: 100,
        degreeId: 1000,
        title: 'Engineering',
        major: 'Electronics'
    },
    {
        id: 200,
        degreeId: 2000,
        title: 'Engineering',
        major: 'Computer Science'
    },
    {
        id: 300,
        degreeId: 3000,
        title: 'Engineering',
        major: 'Telecommunication'
    },
    { 
        id: 400,
        degreeId: 4000, 
        title: 'Commerce', 
        major: 'Accounts'  
    } 
];  

function findDegree(call, callback) {
    let degree = DEGREE.find((degree) => degree.degreeId == call.request.id);
    if(degree) {
        console.log('this is the degree at findDegree of ./degree/main.js:',degree)
        callback(null, degree);
    }
    else {
        callback({
            message: 'Degree not found',
            code: grpc.status.INVALID_ARGUMENT
        });
    }
}
 
const server = new grpc.Server();
server.addService(degreeProto.Degrees.service, { Find: findDegree });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
      console.log('Degree service is running on port 50051');
});