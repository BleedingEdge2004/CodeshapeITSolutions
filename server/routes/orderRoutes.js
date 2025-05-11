import express from 'express';
import { requireSignIn } from '../middlewares/authMiddlewares.js';
import { placeOrder, getUserOrders } from '../controllers/orderController.js';

const router = express.Router();
//Place an order
router.post('/place', requireSignIn, placeOrder);
// Get order history
router.get('/', requireSignIn, getUserOrders);


export default router;