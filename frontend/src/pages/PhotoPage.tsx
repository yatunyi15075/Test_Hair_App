import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios'; // Add axios for API calls

const PhotoPage: React.FC = () => {
  const [isCameraView, setIsCameraView] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null); // State for backend results

  const openCameraView = () => {
    setIsCameraView(true);
  };

  // Handle Image Upload
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Send image to the backend for analysis
      const response = await axios.post('http://localhost:5000/api/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysisResult(response.data.analysisResult); // Display result from backend
      alert('Image uploaded and analyzed successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200">
      {!isCameraView ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center transform hover:scale-105 transition-all duration-300 ease-in-out">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Captured"
              className="w-full h-56 object-cover rounded-md mb-4 shadow-lg"
            />
          ) : (
            <img
              src="https://example.com/hair-analysis-photo.jpg"
              alt="Take a Photo"
              className="w-full h-56 object-cover rounded-md mb-4 shadow-lg"
            />
          )}
          <h2 className="text-3xl font-bold mb-2 text-pink-700">Take a photo</h2>
          <p className="text-gray-600 mb-6">
            We'll use this to detect your hair type and recommend products.
          </p>
          <button
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 focus:outline-none transform hover:scale-110 transition-all duration-300 mb-2"
            onClick={openCameraView}
          >
            Use Camera
          </button>

          {/* File Input for Gallery Selection */}
          <div className="relative inline-block">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file && /\.(png|jpe?g)$/i.test(file.name)) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setImageSrc(reader.result as string);
                    // Upload the selected image to the backend
                    uploadImage(file);
                  };
                  reader.readAsDataURL(file);
                } else {
                  alert('Please select a valid image file (PNG, JPG, JPEG).');
                }
              }}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 focus:outline-none transform hover:scale-110 transition-all duration-300">
              Choose from Library
            </button>
          </div>

          {/* Display Backend Analysis Result */}
          {analysisResult && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-pink-700">Analysis Result</h3>
              <p>{analysisResult}</p>
            </div>
          )}
        </div>
      ) : (
        <CameraCapturePage setImageSrc={setImageSrc} setIsCameraView={setIsCameraView} uploadImage={uploadImage} />
      )}
    </div>
  );
};

// Camera View Component
const CameraCapturePage: React.FC<{
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
  setIsCameraView: React.Dispatch<React.SetStateAction<boolean>>;
  uploadImage: (file: File) => Promise<void>;
}> = ({ setImageSrc, setIsCameraView, uploadImage }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraOpen(true);
        }
      } catch (error) {
        alert('Camera not accessible or permission denied.');
        setIsCameraView(false);
      }
    };

    openCamera();
  }, [setIsCameraView]);

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      const capturedImage = canvasRef.current.toDataURL('image/jpeg');
      setImageSrc(capturedImage);

      // Convert the captured image to a file and upload it
      const file = dataURLToFile(capturedImage, 'captured-photo.jpg');
      uploadImage(file);

      // Stop the camera and go back to the main view
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraView(false);
    }
  };

  const dataURLToFile = (dataUrl: string, fileName: string) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="relative">
        <video ref={videoRef} autoPlay className="w-full h-72 object-cover rounded-md mb-4 shadow-lg"></video>
        <canvas ref={canvasRef} className="hidden"></canvas>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4">
          <button
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 focus:outline-none transform hover:scale-110 transition-all duration-300"
            onClick={capturePhoto}
          >
            Capture Photo
          </button>
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none transform hover:scale-110 transition-all duration-300"
            onClick={() => {
              setIsCameraView(false);
              const stream = videoRef.current?.srcObject as MediaStream;
              if (stream) stream.getTracks().forEach((track) => track.stop());
            }}
          >
            Close Camera
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;
