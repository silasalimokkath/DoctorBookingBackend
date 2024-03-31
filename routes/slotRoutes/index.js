import express from 'express';
import Slot from '../../db/models/slotSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();
//create slot(post Slot)--------------------------------------------------------------------------//
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const slot = await Slot.create(body);
    return res.status(200).json(slot);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Slots Get-----------------------------------------------------------------------------------------------//
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find();
    return res.status(200).json(slots);
  } catch (e) {
    res.status(500).json(e);
  }
});
//Get slot by slotId---------------------------------------------------------------------------------------------------//
router.get('/:sltId', async (req, res) => {
  try {
    const { sltId } = req.params;
    const slot = await Slot.findById(sltId);
    return res.status(200).json(slot);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
//list slots by doctor id------------------------------------------------------------------------------------------------//
router.get('/doctor/:docId', async (req, res) => {
  try {
    const { docId } = req.params;
    const slots = await Slot.find({ doctor: docId });
    return res.status(200).json(slots);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Slot update--------------------------------------------------------------------------------------------------------------------//
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ message: 'updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Slot delete-------------------------------------------------------------------------------------------------------------------------//
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.findByIdAndDelete(id);
    return res.status(200).json({ message: 'deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
