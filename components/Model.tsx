import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import gsap from 'gsap';

export default function Model({ checkpointIndex }: { checkpointIndex: number }) {

  const group = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF('/model.glb');
  const { actions } = useAnimations(animations, scene);
  const { camera } = useThree();

  // Define checkpoints with model and camera positions along the path of the bridge
  const checkpoints = [
    { position: new Vector3(71.36572518299545, 2.169883844008327, 96.37298038368012), cameraPosition: new Vector3(71.36572518299545, 5, 106.37298038368012) },
    { position: new Vector3(-10.940558277307233, 2.1753345509946196, 209.35690010917915), cameraPosition: new Vector3(-10.940558277307233, 5, 219.35690010917915) },
    { position: new Vector3(21.04859334988594, 2.169884302455384, 328.5918991105614), cameraPosition: new Vector3(21.04859334988594, 5, 338.5918991105614) },
    { position: new Vector3(121.28112763515932, 20.169882637428007, 150.46812265424273), cameraPosition: new Vector3(121.28112763515932, 25, 160.46812265424273) },
    { position: new Vector3(-157.53151338647598, 2.169883743889236, 75.039088830189), cameraPosition: new Vector3(-157.53151338647598, 5, 85.039088830189) },
    { position: new Vector3(73.82657706213615, 2.169883951575636, 31.073111558043685), cameraPosition: new Vector3(73.82657706213615, 5, 41.073111558043685) },
  ];

  useEffect(() => {
    if (actions && actions['Experiment']) {
      actions['Experiment'].play().paused = true;
    }
  }, [actions]);

  useEffect(() => {
    const currentCheckpoint = checkpoints[checkpointIndex];

    // Animate model position to the current checkpoint
    if (group.current) {
      gsap.to(group.current.position, {
        x: currentCheckpoint.position.x,
        y: currentCheckpoint.position.y,
        z: currentCheckpoint.position.z,
        duration: 1,
      });
    }

    console.log('Model position:', currentCheckpoint.position);
    console.log('Camera position:', currentCheckpoint.cameraPosition);
  }, [checkpointIndex, checkpoints]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
          camera.rotation.x -= 0.1;
          break;
        case 's':
          camera.rotation.x += 0.1;
          break;
        case 'a':
          camera.rotation.y -= 0.1;
          break;
        case 'd':
          camera.rotation.y += 0.1;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera]);

  return (
    <>
      <OrbitControls enableRotate={false} />
      {checkpoints.map((checkpoint, index) => (
        <PerspectiveCamera
          key={index}
          makeDefault={index === checkpointIndex}
          position={checkpoint.cameraPosition.toArray()}
          fov={75}
        />
      ))}
      <group ref={group} scale={[0.1, 0.1, 0.1]}>
        <primitive object={scene} />
      </group>
    </>
  );
}

useGLTF.preload('/model.glb');