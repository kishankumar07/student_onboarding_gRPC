import { startGrpcServer } from './grpcServer.js';

const PORT = 50052;

startGrpcServer(PORT, (port) => {
    console.log(`Process service is running on port ${port}`);
});
