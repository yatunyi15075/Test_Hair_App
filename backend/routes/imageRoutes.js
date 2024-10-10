import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage, getAllImages, deleteImage } from '../controllers/imageController.js';

const router = express.Router();

// Set up storage for Multer with proper path configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  },
});

const upload = multer({ storage: storage });


router.post('/', upload.single('image'), uploadImage);
router.get('/', getAllImages);
router.delete('/:id', deleteImage);


export default router;
