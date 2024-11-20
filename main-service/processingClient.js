import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefinitionProc = protoLoader.loadSync(path.join(__dirname, '../protos/processing.proto'));
const processingProto = grpc.loadPackageDefinition(packageDefinitionProc);

const processingStub = new processingProto.Processing('0.0.0.0:50052', grpc.credentials.createInsecure());

export function processOrder(order, onStatusUpdate) {
    const call = processingStub.process({
        orderId: order.id,
        degreeId: order.degree.id,
    });

    call.on('data', (statusUpdate) => {
        onStatusUpdate(statusUpdate);
    });
}
