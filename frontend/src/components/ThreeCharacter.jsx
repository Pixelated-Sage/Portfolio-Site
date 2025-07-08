import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Character = () => {
  const { scene } = useGLTF('../../public/models/Character.glb'); // Path is from public folder
  return <primitive object={scene} scale={1.5} />;
};

const ThreeCharacter = () => {
  return (
    <Canvas camera={{ position: [0, 1, 4] }} className="w-full h-[500px]">
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 5]} />
      <Suspense fallback={null}>
        <Character />
      </Suspense>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default ThreeCharacter;
