"use client"
import Dog from './components/Dog'
import { Canvas } from '@react-three/fiber';
export default function Home() {
  return (
    <>
      <Canvas>
        <Dog />
      </Canvas>
    </>
  );
}
