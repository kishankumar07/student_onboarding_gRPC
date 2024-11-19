import path from 'path'
import grpc from '@grpc/grpc-js'
import { fileURLToPath } from 'url';
import express from 'express';
import protoLoader from '@grpc/proto-loader'

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


const packageDefinitionRec = protoLoader.
                            loadSync(path.join(__dirname, '../protos/degree.proto'));
const packageDefinitionProc = protoLoader.
                            loadSync(path.join(__dirname, '../protos/processing.proto'));
const degreeProto = grpc.loadPackageDefinition(packageDefinitionRec);
const processingProto = grpc.loadPackageDefinition(packageDefinitionProc);


const degreeStub = new degreeProto.Degrees('0.0.0.0:50051',
                        grpc.credentials.createInsecure());
const processingStub = new processingProto.Processing('0.0.0.0:50052',
                        grpc.credentials.createInsecure());

const app = express();
app.use(express.json());
                        
const port = 3000;
let orders = {};

function processAsync(order) {
    degreeStub.find({ id: order.degreeId }, (err, degree) => {
        if(err) return;
      console.log('what is this degree:',degree)
        orders[order.id].degree = degree;
        console.log('what is the value of orders now :',orders)
        const call = processingStub.process({
            orderId: order.id,
            degreeId: degree.id
        });
        call.on('data', (statusUpdate) => {
            console.log('this is the statusUpdate:',statusUpdate)
            let statusValue;
            switch (statusUpdate.status) {
                case 0:
                    statusValue = "NEW"
                    break;
                    case 1:
                        statusValue = "QUEUED"
                    break;
                    case 2:
                        statusValue = "PROCESSING"
                    break;
                    case 3:
                        statusValue = "DONE"
                    break;
                default:
                    statusValue = "DEFAULT"
                    break;
            }
            orders[order.id].status = statusValue;
        });
    });
}

app.post('/studentOnboard', (req, res) => {
    if(!req.body.degreeId) {
        res.status(400).send('Product identifier is not set');
        return;
    }
    let orderId = Object.keys(orders).length + 1;
    console.log('Object.keys of orderId:',Object.keys(orders)) 
    let order = {
        id: orderId,
        status: "NEW",
        degreeId: req.body.degreeId,
        personalDetails: {
            name: req.body.name,
            DOB : req.body.DOB,
            education : req.body.education,
            fatherName : req.body.father
        },
        createdAt : new Date().toLocaleString()
    };
    orders[order.id] = order;
    console.log(orders)
    processAsync(order);
    res.send(order);
});

app.get('/onboardingStatus/:id', (req, res) => {
    if(!req.params.id || !orders[req.params.id]) {
        res.status(400).send('OnBoarding form  not found');
        return;
    }
    res.send(orders[req.params.id]);
});

app.listen(port, () => {
  console.log(`API is listening on port ${port}`)
});