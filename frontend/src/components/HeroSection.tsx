import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import girl from '../models/source/girl.glb';
import textureImage from '../models/textures/textureImage.png';

const BlowDryer: React.FC = () => {
  const { scene } = useGLTF(girl);
  const texture = useTexture(textureImage);

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
        map: texture,
      });
    }
  });

  return <primitive object={scene} scale={1.5} />;
};

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center bg-gray-900 text-white p-8 min-h-screen">
      {/* Text Content */}
      <div className="md:w-1/2 p-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Hair Analysis!</h2>
        <p className="text-lg md:text-xl mb-6">
          Discover the best products tailored specifically for your hair type. Our innovative
          analysis helps you find solutions for all your hair needs.
        </p>
      </div>

      {/* 3D Model */}
      <div className="w-full md:w-1/2 h-[70vh] flex justify-center items-center">
        <Canvas>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <BlowDryer />
          <OrbitControls />
        </Canvas>
      </div>
    </section>
  );
};

export default HeroSection;
