project/
├── degree/
│   └── main.js           # gRPC server to handle degree-related services.
├── process/
│   └── main.js           # gRPC server to handle processing-related tasks.
├── main/
│   └── main.js           # API Gateway using Express.js to connect gRPC services.
├── protos/
│   ├── degree.proto      # gRPC definition for degree-related services.
│   └── processing.proto  # gRPC definition for processing services.
├── package.json          # Project dependencies and scripts.
