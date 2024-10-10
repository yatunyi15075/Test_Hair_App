import Image from '../models/Image.js';
import path from 'path';
import fs from 'fs';
import { PythonShell } from 'python-shell'; // Add PythonShell for running the model script

// Controller for uploading and analyzing an image using the downloaded model
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Save the image file path in the database
    const imagePath = path.join('uploads', req.file.filename);  // Change to `path.join` for compatibility
    const image = await Image.create({ imageUrl: imagePath });

    // Define the path to the Python script and model files
    const scriptPath = path.join(process.cwd(), 'scripts', 'model_inference.py');
    const modelPath = path.join(process.cwd(), 'model', 'model.bin');
    const metadataPath = path.join(process.cwd(), 'model', 'metadata.json');

    // Run the model inference script using PythonShell
    const options = {
      pythonPath: 'python',  // Ensure the path to the python executable is set correctly
      args: [imagePath, modelPath, metadataPath], // Pass image path, model file, and metadata as arguments
    };

    PythonShell.run(scriptPath, options, (err, results) => {
      if (err) {
        console.error('Error in model inference:', err);
        return res.status(500).json({ error: 'Failed to analyze image' });
      }

      // Assuming the script outputs a JSON string with analysis results
      const analysisResult = results[0] || 'Analysis could not be performed.';

      res.status(201).json({ message: 'Image uploaded and analyzed successfully', image, analysisResult });
    });
  } catch (error) {
    console.error('Error uploading or analyzing image:', error); // Log the error for debugging
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
