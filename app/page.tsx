"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

const Model = dynamic(() => import("@/components/Model"), { ssr: false });

export default function Home() {
  const [checkpointIndex, setCheckpointIndex] = useState(0);

  const handleNextCheckpoint = () => {
    setCheckpointIndex((prevIndex) => Math.min(prevIndex + 1, checkpoints.length - 1));
  };

  const handlePrevCheckpoint = () => {
    setCheckpointIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const checkpoints = [
    { position: [0, 0, 0], cameraPosition: [0, 5, 10] },
    { position: [10, 0, 0], cameraPosition: [10, 5, 10] },
    { position: [20, 0, 0], cameraPosition: [20, 5, 10] },
    { position: [30, 0, 0], cameraPosition: [30, 5, 10] },
    // Add more checkpoints as needed
  ];

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Canvas style={{ height: '100vh' }}>
        <Model checkpointIndex={checkpointIndex} />
      </Canvas>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <button onClick={handlePrevCheckpoint}>Previous</button>
        <button onClick={handleNextCheckpoint}>Next</button>
      </div>
    </div>
  );
}