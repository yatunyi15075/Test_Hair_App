import express from 'express';
import multer from 'multer';
import { uploadImage, getAllImages, deleteImage } from '../controllers/imageController.js';

const router = express.Router();

// Setup multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getAllImages);
router.delete('/:id', deleteImage);

export default router;
