import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import { Group } from 'three';

export default function Model({ checkpointIndex }) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF('/model.glb');
  const { actions, clips } = useAnimations(animations, scene);
  const { camera } = useThree();

  const checkpoints = [
    { position: [0, 0, 0], cameraPosition: [0, 5, 10] },
    { position: [10, 0, 0], cameraPosition: [10, 5, 10] },
    { position: [20, 0, 0], cameraPosition: [20, 5, 10] },
    { position: [30, 0, 0], cameraPosition: [30, 5, 10] },
    // Add more checkpoints as needed
  ];

  useEffect(() => {
    if (actions && actions['Experiment']) {
      actions['Experiment'].play().paused = true;
    }
  }, [actions]);

  useFrame(() => {
    if (actions && actions['Experiment']) {
      const duration = actions['Experiment'].getClip().duration;
      actions['Experiment'].time = (duration * checkpointIndex) / (checkpoints.length - 1);

      const currentCheckpoint = checkpoints[checkpointIndex];

      if (group.current) {
        group.current.position.set(...(currentCheckpoint.position as [number, number, number]));
        console.log('Model position:', group.current.position);
      }

      camera.position.set(...(currentCheckpoint.cameraPosition as [number, number, number]));
      camera.lookAt(group.current.position);
      console.log('Camera position:', camera.position);
    }
  });

  return (
    <>
      <OrbitControls />
      <group ref={group} scale={[0.1, 0.1, 0.1]}>
        <primitive object={scene} />
      </group>
    </>
  );
}

useGLTF.preload('/model.glb');