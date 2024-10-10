import Image from '../models/Image.js';
import path from 'path';
import fs from 'fs';
import { PythonShell } from 'python-shell';


export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Save the image file path in the database
    const imagePath = `uploads/${req.file.filename}`;
    const image = await Image.create({ imageUrl: imagePath });

    // Define the path to the Python script and model file
    const scriptPath = path.join(process.cwd(), 'scripts', 'model_inference.py');
    const weightsPath = path.join(process.cwd(), 'model', 'weights.pth'); // Use weights.pth file
    const metadataPath = path.join(process.cwd(), 'model', 'metadata.json');

    console.log('Script Path:', scriptPath);
    console.log('Weights Path:', weightsPath);
    console.log('Metadata Path:', metadataPath);
    console.log('Image Path:', imagePath);

    let options = {
      args: [imagePath, weightsPath, metadataPath], // Pass image path, weights file, and metadata as arguments
    };

    PythonShell.run(scriptPath, options, (err, results) => {
      if (err) {
        console.error('Error in model inference:', err);
        return res.status(500).json({ error: 'Failed to analyze image' });
      }

      // Assuming the script outputs a JSON string with analysis results
      const analysisResult = results ? results[0] : 'Analysis could not be performed.';
      res.status(201).json({ message: 'Image uploaded and analyzed successfully', image, analysisResult });
    });
  } catch (error) {
    console.error('Error uploading or analyzing image:', error);
    res.status(500).json({ error: 'Image upload or analysis failed' });
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

    const imagePath = path.join(process.cwd(), image.imageUrl);
    fs.unlinkSync(imagePath); // Delete the file from the server

    await Image.destroy({ where: { id: imageId } });
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
