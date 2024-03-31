import express from 'express';
import Medicine from '../../db/models/medicineSchema.js';

const router = express.Router();

//Medicine Post-------------------------------------------------------------------------------------------//
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const medicine = await Medicine.create(body);
    return res.status(201).json(medicine);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Medicines Get---------------------------------------------------------------------------------------------------//
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    return res.status(200).json(medicines);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Get Medicine by medicineId-------------------------------------------------------------------------------------------------------//
router.get('/:medId', async (req, res) => {
  try {
    const { medId } = req.params;
    const medicine = await Medicine.findById(medId);
    return res.status(200).json(medicine);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Update Medicine-------------------------------------------------------------------------------------------------------------------------//
router.patch('/:medId', async (req, res) => {
  try {
    const { medId } = req.params;
    const medicine = await Medicine.findByIdAndUpdate(medId, req.body);
    return res.status(200).json({ message: 'updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Delete Medicine-------------------------------------------------------------------------------------------------------------------------//
router.delete('/:medId', async (req, res) => {
  try {
    const { medId } = req.params;
    const medicine = await Medicine.findByIdAndDelete(medId);
    return res.status(200).json(medicine);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//----------------------------------------------------------------------------------------------------------------------------------------//

export default router;
