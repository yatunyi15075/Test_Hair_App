import Image from '../models/Image.js';
import path from 'path';
import fs from 'fs';

// Controller for uploading images
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const imagePath = `uploads/${req.file.filename}`;
    const image = await Image.create({ imageUrl: imagePath });
    res.status(201).json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};

// Controller for fetching all uploaded images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

// Controller for deleting an image
export const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findByPk(imageId);

    if (!image) return res.status(404).json({ error: 'Image not found' });

    const imagePath = path.join(__dirname, `../${image.imageUrl}`);
    fs.unlinkSync(imagePath); // Delete the file from the server

    await Image.destroy({ where: { id: imageId } });
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
