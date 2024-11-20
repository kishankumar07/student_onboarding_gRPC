import dotenv from 'dotenv';

dotenv.config();

const config = {
    mongoURI: process.env.MONGO_DEGREE_URI,
    grpcPort: process.env.GRPC_DEGREE_PORT 
};

export default config;
