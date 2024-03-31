import express from 'express';

import Order from '../../db/models/ordersSchema.js';

const router = express.Router();

//order post--------------------------------------------------------------------------------------------------------------------------//
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const order = await Order.create(body);
    return res.status(200).json(order);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Orders Get-------------------------------------------------------------------------------------------------------------------------------//
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(201).json(orders);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Order Get by Order Id---------------------------------------------------------------------------------------------------------//
router.get('/:ordId', async (req, res) => {
  try {
    const { ordId } = req.params;
    const order = await Order.findById(ordId);
    return res.status(200).json(order);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Order Update-----------------------------------------------------------------------------------------------------------------//
router.patch('/:ordId', async (req, res) => {
  try {
    const { ordId } = req.params;
    const order = await Order.findByIdAndUpdate(ordId, req.body);
    return res.status(200).json(order);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Order Delete---------------------------------------------------------------------------------------------------------------//
router.delete('/:ordId', async (req, res) => {
  try {
    const { ordId } = req.params;
    const order = await Order.findByIdAndDelete(ordId);
    return res.status(200).json(order);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Get oders list by prescription id-------------------------------------------------------------------------------------------------------//
router.get('/prescription/:presId', async (req, res) => {
  try {
    const { presId } = req.params;
    const orders = await Order.find({ prescription: presId });
    return res.status(200).json(orders);
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
