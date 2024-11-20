import path from 'path';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import mongoose from 'mongoose';
import config from './config/config.js';
import { findDegree,createTheDegree } from './controllers/degreeController.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// console.log(path.join(__dirname, '../protos/degree.proto'));
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../protos/degree.proto'));
const degreeProto = grpc.loadPackageDefinition(packageDefinition);
// console.log('check if degreeProtoexits:',degreeProto);

const server = new grpc.Server();
server.addService(degreeProto.degree.Degrees.service, {      
     Find: findDegree,
    createDegree : createTheDegree
 }); 

 
mongoose.connect(config.mongoURI)
    .then(() => {
        console.log('MongoDB connected at degree service first before server starts');
        server.bindAsync(`0.0.0.0:${config.grpcPort}`, grpc.ServerCredentials.createInsecure(), () => {
            console.log(`Degree service running on port ${config.grpcPort}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
   