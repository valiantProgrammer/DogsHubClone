"use client"
import Dog from './components/Dog'
import { Canvas } from '@react-three/fiber';
export default function Home() {
  return (
    <>
      <main>
        <Canvas>
          <Dog />
        </Canvas>
      </main>
    </>
  );
}
