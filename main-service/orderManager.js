import { findDegreeById } from './degreeClient.js';
import { processOrder } from './processingClient.js';

let orders = {};

export function createOrder(orderDetails) {
    const orderId = Object.keys(orders).length + 1;
    const order = {
        id: orderId,
        status: 'NEW',
        degreeId: orderDetails.degreeId,
        personalDetails: {
            name: orderDetails.name,
            DOB: orderDetails.DOB,
            education: orderDetails.education,
            fathersName: orderDetails.father,
        },
        createdAt: new Date().toLocaleString(),
    };
    orders[orderId] = order;

    // Process the order asynchronously
    processAsync(order);
    return order;
}

export function getOrderById(orderId) {
    return orders[orderId] || null;
}

function processAsync(order) {
    findDegreeById(order.degreeId, (err, degree) => {
        if (err) {
            console.error('Error finding degree at processAsync of orderManager.js:', err);
            return;
        }

        // Attach degree details to the order
        orders[order.id].degree = degree;

        // Start processing the order
        processOrder(order, (statusUpdate) => {
            let statusValue;
            switch (statusUpdate.status) {
                case 0: statusValue = 'NEW'; break;
                case 1: statusValue = 'QUEUED'; break;
                case 2: statusValue = 'PROCESSING'; break;
                case 3: statusValue = 'DONE'; break;
                default: statusValue = 'DEFAULT'; break;
            }
            orders[order.id].status = statusValue;
        });
    });
}
