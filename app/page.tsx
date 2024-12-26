"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

const Model = dynamic(() => import("@/components/Model"), { ssr: false });

export default function Home() {
  const [checkpointIndex, setCheckpointIndex] = useState(0);

  const handleNextCheckpoint = () => {
    setCheckpointIndex((prevIndex) => (prevIndex + 1) % checkpoints.length);
  };

  const handlePrevCheckpoint = () => {
    setCheckpointIndex((prevIndex) => (prevIndex - 1 + checkpoints.length) % checkpoints.length);
  };

  const checkpoints = [
    { position: [71.36572518299545, 2.169883844008327, 96.37298038368012], cameraPosition: [71.36572518299545, 5, 106.37298038368012] },
    { position: [-10.940558277307233, 2.1753345509946196, 209.35690010917915], cameraPosition: [-10.940558277307233, 5, 219.35690010917915] },
    { position: [21.04859334988594, 2.169884302455384, 328.5918991105614], cameraPosition: [21.04859334988594, 5, 338.5918991105614] },
    { position: [121.28112763515932, 20.169882637428007, 150.46812265424273], cameraPosition: [121.28112763515932, 25, 160.46812265424273] },
    { position: [-157.53151338647598, 2.169883743889236, 75.039088830189], cameraPosition: [-157.53151338647598, 5, 85.039088830189] },
    { position: [73.82657706213615, 2.169883951575636, 31.073111558043685], cameraPosition: [73.82657706213615, 5, 41.073111558043685] },
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