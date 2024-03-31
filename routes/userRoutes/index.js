import express from 'express';
import User from '../../db/models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();
//User SighnUp(Post user)-----------------------------------------------------------------------------------------//
router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(400).json({ Message: 'USER email-id already exist' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(400).json({ message: 'Password is does not match ' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    console.log(hashedPassword);
    body.password = hashedPassword;
    const addUser = await User.create(body);
    res.status(201).json(addUser);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//User Login-----------------------------------------------------------------------------------------------------//
router.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(403).json({ message: 'Email-id does not exist' });
    }
    const isMatching = await bcrypt.compare(body.password, user.password);
    console.log(isMatching);
    if (!isMatching) {
      return res.status(403).json({ message: 'Password is Incorrect' });
    }
    const token = jwt.sign(
      { id: user._id, role: 'USER' },
      'AbCdEfGhIjKlMnOpQrStUvWxYz',
      { expiresIn: '14d' }
    );
    res.status(200).json({ message: 'LoggedIn', token: token });
  } catch (e) {
    res.status(500).json(e);
  }
});
//users Get--------------------------------------------------------------------------------//
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//user update---------------------------------------------------------------------------//
router.patch('/:usId', async (req, res) => {
  try {
    const { usId } = req.params;
    const user = await User.findByIdAndUpdate(usId, req.body);
    return res.status(200).json({ message: 'Upadated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//user Delete------------------------------------------------------------------------------------//
router.delete('/:usId', async (req, res) => {
  try {
    const { usId } = req.params;
    const user = await User.findByIdAndDelete(usId);
    return res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Get user by id-----------------------------------------------------------------------------//
router.get('/:usId', async (req, res) => {
  try {
    const { usId } = req.params;
    const user = await User.findById(usId);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//--------------------------------------------------------------------------------------------------//
export default router;
