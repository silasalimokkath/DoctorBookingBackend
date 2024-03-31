import express from 'express';
import Doctor from '../../db/models/doctorSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

//Doctor SignUP(Post Doctor)------------------------------------------------------------------------------------------------//
router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctor.findOne({ email: body.email });
    if (doctor) {
      return res
        .status(400)
        .json({ message: 'Doctor with this email already exist' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(400).json({ message: 'password does not match' });
    }

    const hashedPassword = await bcrypt.hash(body.password, 2);
    console.log(hashedPassword);
    body.password = hashedPassword;
    const addDoctor = await Doctor.create(body);
    res.status(201).json(addDoctor);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Doctor LogIn---------------------------------------------------------------------------------------------------//
router.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctor.findOne({ email: body.email });
    if (!doctor) {
      console.log(doctor);
      // return res.status(403).json({ message: 'Email or password incorrect' });
      return res.status(400).json({ message: 'email in correct' });
    }
    const isMatching = await bcrypt.compare(body.password, doctor.password);
    if (!isMatching) {
      console.log(isMatching);
      return res.status(403).json({ message: 'email or Password incorrect' });
    }
    const token = jwt.sign(
      { id: doctor._id, role: 'DOCTOR' },
      'AbCdEfGhIjKlMnOpQrStUvWxYz',
      { expiresIn: '7d' }
    );
    return res.status(200).json({ message: 'Logged In', token: token });
  } catch (e) {
    res.status(500).json(e);
  }
});
//Doctors Get------------------------------------------------------------------------------------------------------//
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(201).json(doctors);
  } catch (e) {
    return res.status(500).json(e);
  }
});
// Get doctor by doctor id-------------------------------------------------------------------------------------------------//
router.get('/:docId', async (req, res) => {
  try {
    const { docId } = req.params;
    const doctor = await Doctor.findById(docId);
    return res.status(200).json(doctor);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//list doctors by department id------------------------------------------------------------------------------------//
router.get('/department/:depId', async (req, res) => {
  try {
    console.log(req.params);
    const { depId } = req.params;
    console.log(depId);
    const doctors = await Doctor.find({ department: depId });
    return res.status(200).json(doctors);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Doctor Update-------------------------------------------------------------------------------------------------------//
router.patch('/:docId', async (req, res) => {
  try {
    const { docId } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(docId, req.body);
    return res.status(201).json({ message: 'Updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Doctor Delete-------------------------------------------------------------------------------------------------------//
router.delete('/:docId', async (req, res) => {
  try {
    const { docId } = req.params;
    const doctor = await Doctor.findByIdAndDelete(docId);
    return res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//--------------------------------------------------------------------------------------------------------------------//

export default router;
