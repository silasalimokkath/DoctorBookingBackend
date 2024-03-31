import express from 'express';

import Department from '../../db/models/departmentSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';

const router = express.Router();
//Department Post-----------------------------------------------------------------//
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const department = await Department.create(body);
    return res.status(200).json(department);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Get Departments----------------------------------------------------------------------------//
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json(departments);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Get Department by id----------------------------------------------------------------------------//
router.get('/:depId', async (req, res) => {
  try {
    const { depId } = req.params;
    const department = await Department.findById(depId);
    return res.status(200).json(department);
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Department Update----------------------------------------------------------------------------------------//
router.patch('/:depId', async (req, res) => {
  try {
    const { depId } = req.params;
    const department = await Department.findByIdAndUpdate(depId, req.body);
    return res.status(200).json({ message: 'Department Updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});
//Department Delete---------------------------------------------------------------------------------------------//
router.delete('/:depId', async (req, res) => {
  try {
    const { depId } = req.params;
    const department = await Department.findByIdAndDelete(depId);
    return res.status(201).json(department);
  } catch (e) {
    return res.status(500).json(e);
  }
});

//----------------------------------------------------------------------------------------------------//

export default router;
