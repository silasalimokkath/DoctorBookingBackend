import express from 'express';
import multer from 'multer';

const router = express.Router();

// router.use(express.static('uploads'));
// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
  console.log(req.file);
  // res.status(200).json({ message: 'image uploaded' });
  res.status(200).json({ url: `http://localhost:4444/${req.file.filename}` });
});

export default router;
