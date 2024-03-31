import express from 'express';
import Appointment from '../../db/models/appointmentSchema.js';
import Slot from '../../db/models/slotSchema.js';
import nodemailer from 'nodemailer';

const router = express.Router();

//take appointment ---slot booking(Post appointment)-------------------------------------------------------------------------------//
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const appointment = await Appointment.create(body);
    const slot = await Slot.findByIdAndUpdate(req.body.slot, {
      status: 'BOOKED',
    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'silasalimokkath@gmail.com',
        pass: 'ocwe rovs xkzh dhez',
      },
    });
    var mailOptions = {
      from: 'silasalimokkath@gmail.com',
      to: 'navaneethkg99@gmail.com',
      subject: 'Confirmation Mail........',
      text: 'your booking has been confirmed!...Please download the Appointment pdf',
    };
    transporter.sendMail(mailOptions);
    return res.status(201).json({ message: 'Appointment Booked' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Get appointments-------------------------------------------------------------------------------------------------------//
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.status(200).json(appointments);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Get appointment by Id---------------------------------------------------------------------------------------------------//
router.get('/:apntId', async (req, res) => {
  try {
    const { apntId } = req.params;
    const appointment = await Appointment.findById(apntId);
    return res.status(200).json(appointment);
  } catch (e) {
    return res.status(500).json(e);
  }
});
// list appointments by doc id-------------------------------------------------------------------------------------//
router.get('/doctor/:docId', async (req, res) => {
  try {
    const { docId } = req.params;
    const appointments = await Appointment.find({ doctor: docId }).populate([
      'slot',
      'user',
      'doctor',
    ]);
    return res.status(201).json(appointments);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//list appointments by  user id------------------------------------------------------------------------------------//
router.get('/user/:usId', async (req, res) => {
  try {
    const { usId } = req.params;
    const users = await Appointment.find({ user: usId });
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json(e);
  }
});
// update appointment-------------------------------------------------------------------------------//
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndUpdate(id, {
      status: 'CANCELLED',
    });
    const appointment = await Appointment.findById(id);
    const slot = await Slot.findByIdAndUpdate(appointment.slot, {
      status: 'FREE',
    });
    return res.status(300).json({ message: 'Appointment is updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
// Delete appointment-------------------------------------------------------------------------------------//
router.delete('/:apntId', async (req, res) => {
  try {
    const { apntId } = req.params;
    const appointment = await Appointment.findByIdAndDelete(apntId);
    return res.status(200).json({ message: 'Appointment is Deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//download pdf from appointment list-------------------------------------------------------------------------//
router.get('/pdf/:id', async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate([
    'slot',
    'user',
    'doctor',
  ]);
  console.log(appointment);
  res.render('pdf.ejs', { appointment: appointment });
});
//--------------------------------------------------------------------------------------------------------------//
export default router;
