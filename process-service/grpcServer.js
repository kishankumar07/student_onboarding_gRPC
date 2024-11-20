import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
import { process } from './processingService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../protos/processing.proto'));
const processingProto = grpc.loadPackageDefinition(packageDefinition);

// Create and configure the gRPC server
export function startGrpcServer(port, callback) {
    const server = new grpc.Server();

    // Add the processing service
    server.addService(processingProto.Processing.service, { process });

    // Bind the server to the specified port
    server.bindAsync(
        `0.0.0.0:${port}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error('Error binding gRPC server:', err);
                process.exit(1);
            }
            callback(port);
            // server.start();
        }
    );
}
