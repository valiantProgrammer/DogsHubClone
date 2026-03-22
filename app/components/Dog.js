'use client';
import * as THREE from 'three';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { SRGBColorSpace } from 'three';

export default function Dog() {
  const model = useGLTF('/models/dog.drc.glb');
  const { camera, scene } = useThree();

  useThree(({ gl }) => {
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  useEffect(() => {
    camera.position.set(0, 1.8, 5.8);
  }, [camera]);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;

    const context = canvas.getContext('2d');
    if (!context) return;

    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#060a17');
    gradient.addColorStop(0.45, '#101a33');
    gradient.addColorStop(1, '#1b2645');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgba(168, 196, 255, 0.1)';
    context.beginPath();
    context.arc(canvas.width * 0.8, canvas.height * 0.28, 140, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = 'rgba(120, 150, 220, 0.08)';
    for (let index = 0; index < 90; index++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.75;
      const size = Math.random() * 2.2;
      context.fillRect(x, y, size, size);
    }

    const gradientBackground = new THREE.CanvasTexture(canvas);
    gradientBackground.colorSpace = SRGBColorSpace;

    scene.background = gradientBackground;
    scene.backgroundIntensity = 1.05;
    scene.backgroundBlurriness = 0.03;

    return () => {
      scene.backgroundIntensity = 1;
      scene.backgroundBlurriness = 0;
      scene.background = null;
      gradientBackground.dispose();
    };
  }, [scene]);

  return (
    <>
      <primitive object={model.scene} position={[0, -0.9, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} />
      <ambientLight color={0xffffff} intensity={0.75} />
      <hemisphereLight skyColor={0xffffff} groundColor={0xffffff} intensity={0.35} />
      <directionalLight color={0xffffff} position={[1.8, 6, 4.8]} intensity={1.9} />
      <pointLight color={0xffffff} position={[0.3, 2.1, 2.6]} intensity={1.8} distance={7.2} />
      <pointLight color={0xffffff} position={[-0.2, 1.8, -2.8]} intensity={1.9} distance={7.4} />
      <OrbitControls target={[0, 0.5, 0]} />
    </>
  );
}
