import express from 'express';
import { createOrder, getOrderById } from './orderManager.js';

const router = express.Router();

router.post('/studentOnboard', (req, res) => {
    if (!req.body.degreeId) {
        return res.status(400).send('Degree identifier is not set');
    }

    const order = createOrder(req.body);
    res.send(order);
});

router.get('/onboardingStatus/:id', (req, res) => {
    const order = getOrderById(req.params.id);
    if (!order) {
        return res.status(400).send('OnBoarding form not found');
    }
    res.send(order);
});

export default router;
