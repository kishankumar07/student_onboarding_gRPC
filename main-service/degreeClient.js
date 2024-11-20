import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefinitionRec = protoLoader.loadSync(path.join(__dirname, '../protos/degree.proto'));
const degreeProto = grpc.loadPackageDefinition(packageDefinitionRec);

const degreeStub = new degreeProto.degree.Degrees('0.0.0.0:50051', grpc.credentials.createInsecure());

export function findDegreeById(degreeId, callback) {
    degreeStub.find({ id: degreeId }, callback);
}
