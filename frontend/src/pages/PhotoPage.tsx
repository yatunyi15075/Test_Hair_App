import React, { useRef, useState, useEffect } from 'react';

// Main PhotoPage Component
const PhotoPage: React.FC = () => {
  const [isCameraView, setIsCameraView] = useState(false); // State for managing the camera view
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Handle redirection to the Camera View
  const openCameraView = () => {
    setIsCameraView(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200">
      {!isCameraView ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center transform hover:scale-105 transition-all duration-300 ease-in-out">
          {/* Display Image Preview or Default Placeholder */}
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
          {/* Camera Button */}
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
                  };
                  reader.readAsDataURL(file);
                } else {
                  alert("Please select a valid image file (PNG, JPG, JPEG).");
                }
              }}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 focus:outline-none transform hover:scale-110 transition-all duration-300">
              Choose from Library
            </button>
          </div>
        </div>
      ) : (
        <CameraCapturePage setImageSrc={setImageSrc} setIsCameraView={setIsCameraView} />
      )}
    </div>
  );
};

// Camera View Component
const CameraCapturePage: React.FC<{
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
  setIsCameraView: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setImageSrc, setIsCameraView }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Open camera and request permission on mount
  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraOpen(true);
        }
      } catch (error) {
        alert("Camera not accessible or permission denied.");
        setIsCameraView(false);
      }
    };

    openCamera();
  }, [setIsCameraView]);

  // Function to capture the photo
  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      setImageSrc(canvasRef.current.toDataURL('image/jpeg'));

      // Stop the camera and go back to the main view
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraView(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Camera Preview */}
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          className="w-full h-72 object-cover rounded-md mb-4 shadow-lg"
        ></video>
        <canvas ref={canvasRef} className="hidden"></canvas>
        {/* Capture and Close Buttons */}
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
      {/* Permission Handling Message */}
      {isCameraOpen && (
        <div className="bg-white p-4 mt-4 rounded-lg shadow-md text-center">
          <p className="text-gray-700 font-semibold">
            Do you want to continue taking a photo or close the camera?
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
