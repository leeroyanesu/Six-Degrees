import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Howl } from 'howler';

export const Star = ({ position, onPlayerEnter }) => {
  const meshRef = useRef();
  const glowRef = useRef();
  const sensorRef = useRef();
  const starSoundRef = useRef(null);

  // Initialize star collection sound
  useEffect(() => {
    starSoundRef.current = new Howl({
      src: ['/audio/star_sound.mp3'],
      volume: 0.7,
      preload: true
    });

    return () => {
      starSoundRef.current?.unload();
    };
  }, []);

  // Load the Star model
  const { scene } = useGLTF("/model/Star.glb");

  // Clone the scene so we can produce multiple independent star instances
  const starModel = useGLTF("/model/Star.glb").scene.clone();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the star
      meshRef.current.rotation.y += delta * 1.5;
      // Floating animation
      meshRef.current.position.y = -0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }

    // Pulsing glow effect
    // Note: Applying emissive to the model might require traversing or we can just rely on the model's own material + an extra light or just the sphere glow we already have.
    // Let's try to traverse and apply the glow material or property if possible, otherwise rely on the backing glow sphere.
    // For now, I'll keep the backing glow sphere. 
  });

  // Optional: Enhance the model material to look like the gold star we had
  useEffect(() => {
    starModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // If we want to force the gold look:
        child.material = new THREE.MeshStandardMaterial({
          color: "#FFD700",
          emissive: "#FFD700",
          emissiveIntensity: 0.5,
          roughness: 0.1,
          metalness: 0.8
        });
        // Save ref for animation if single mesh, but we rotate the group/ref wrapper
      }
    });
  }, [starModel]);


  const handleIntersection = ({ other }) => {
    // Play star collection sound
    if (starSoundRef.current) {
      starSoundRef.current.play();
    }
    
    // Trigger the callback
    if (onPlayerEnter) {
      onPlayerEnter();
    }
  };

  return (
    <group position={[position.x, 0, position.z]}>
      <RigidBody
        ref={sensorRef}
        type="fixed"
        sensor
        onIntersectionEnter={handleIntersection}
        colliders="ball"
        name="starSensor"
      >
        <group ref={meshRef} position={[0, 0, 0]}>
          <primitive object={starModel} />
        </group>

        {/* Glow sphere behind the star */}
        <mesh position={[0, 0, 0]} scale={1.5}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.15}
          />
        </mesh>
      </RigidBody>
    </group>
  );
};
useGLTF.preload("/model/Star.glb");

