import { Cloud, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const AnimatedClouds = () => {
  const cloudRefs = useRef([]);



  // Define all possible cloud positions - distributed around the island
  const cloudPositions = [
    { position: [5, 15, -20], seed: 1, opacity: 0.5, segments: 12 },      // back right
    { position: [-8, 18, -25], seed: 2, opacity: 0.4, segments: 10 },     // back left
    { position: [10, 20, 15], seed: 3, opacity: 0.45, segments: 12 },    // front right
    { position: [-15, 16, 20], seed: 4, opacity: 0.35, segments: 10 },   // front left
    { position: [20, 22, -5], seed: 5, opacity: 0.42, segments: 12 },    // right side
    { position: [-22, 19, 8], seed: 6, opacity: 0.38, segments: 10 },    // left side
    { position: [0, 17, -28], seed: 7, opacity: 0.4, segments: 10 },     // back center
    { position: [18, 21, 12], seed: 8, opacity: 0.36, segments: 12 },    // front right
    { position: [-5, 16, -18], seed: 9, opacity: 0.43, segments: 10 },   // back
    { position: [15, 19, 25], seed: 10, opacity: 0.37, segments: 12 },    // front right
  ];

  return (
    <>
      <Float
      floatIntensity={0.3}
      rotationIntensity={0.1}
      speed={0.2}
      >
        {cloudPositions.slice(0, 10).map((cloud, index) => (
          <Cloud
            key={index}
            ref={(el) => (cloudRefs.current[index] = el)}
            position={cloud.position}
            seed={cloud.seed}
            opacity={cloud.opacity}
            segments={cloud.segments}
            bounds={[6, 2, 2]}
            volume={6}
            color="#ffffff"
            fade={10}
          />
        ))}
      </Float>

    </>
  );
};
