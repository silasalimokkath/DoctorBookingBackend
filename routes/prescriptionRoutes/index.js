import express from 'express';
import { checkToken } from '../../middlewares/checkToken.js';
import Prescription from '../../db/models/prescriptionSchema.js';

const router = express.Router();

//Prescription Post------------------------------------------------------------------------//
router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    const prescription = await Prescription.create(body);
    return res.status(201).json(prescription);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Prescriptions GET---------------------------------------------------------------------------------//
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    return res.status(200).json(prescriptions);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Prescription Update-------------------------------------------------------------------------------------//
router.patch('/:presId', async (req, res) => {
  try {
    const { presId } = req.params;
    const prescription = await Prescription.findByIdAndUpdate(presId, req.body);
    return res.status(200).json({ message: 'Updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Prescripton Delete----------------------------------------------------------------------------------------//
router.delete('/:presId', async (req, res) => {
  try {
    const { presId } = req.params;
    const prescription = await Prescription.findByIdAndDelete(presId);
    return res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Get Prescription by Id-------------------------------------------------------------------------------------//
router.get('/:presId', async (req, res) => {
  try {
    const { presId } = req.params;
    const prescription = await Prescription.findById(presId);
    return res.status(200).json(prescription);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Get list prescriptions by appointmentid---------------------------------------------------------------------//
router.get('/appointment/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const prescription = await Prescription.find({
      appointment: appointmentId,
    });
    return res.status(200).json(prescription);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//-----------------------------------------------------------------------------------------------//

export default router;
