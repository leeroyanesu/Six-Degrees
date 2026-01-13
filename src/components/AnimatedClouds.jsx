import { Cloud, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const AnimatedClouds = () => {
  const cloudRefs = useRef([]);



  // Define all possible cloud positions - distributed around the island
  const cloudPositions = [
    { position: [5, 15, -20], seed: 1, opacity: 0.5, segments: 20 },      // back right
    { position: [-8, 18, -25], seed: 2, opacity: 0.4, segments: 18 },     // back left
    { position: [10, 20, 15], seed: 3, opacity: 0.45, segments: 22 },    // front right
    { position: [-15, 16, 20], seed: 4, opacity: 0.35, segments: 19 },   // front left
    { position: [20, 22, -5], seed: 5, opacity: 0.42, segments: 21 },    // right side
    { position: [-22, 19, 8], seed: 6, opacity: 0.38, segments: 20 },    // left side
    { position: [0, 17, -28], seed: 7, opacity: 0.4, segments: 18 },     // back center
    { position: [18, 21, 12], seed: 8, opacity: 0.36, segments: 23 },    // front right
    { position: [-5, 16, -18], seed: 9, opacity: 0.43, segments: 19 },   // back
    { position: [15, 19, 25], seed: 10, opacity: 0.37, segments: 21 },    // front right
    { position: [-12, 23, 18], seed: 11, opacity: 0.41, segments: 20 },   // front left
    { position: [8, 17, 22], seed: 12, opacity: 0.39, segments: 22 },     // front center
    { position: [-18, 20, -12], seed: 13, opacity: 0.44, segments: 18 },  // left back
    { position: [20, 18, -15], seed: 14, opacity: 0.33, segments: 19 },   // right back
    { position: [3, 21, 19], seed: 15, opacity: 0.46, segments: 21 },     // front center
    { position: [-10, 15, -22], seed: 16, opacity: 0.34, segments: 20 },  // back left
    { position: [13, 24, 10], seed: 17, opacity: 0.40, segments: 22 },    // front right
    { position: [-20, 19, -8], seed: 18, opacity: 0.38, segments: 19 },   // left side
    { position: [7, 16, -25], seed: 19, opacity: 0.42, segments: 21 },    // back right
    { position: [-3, 22, 16], seed: 20, opacity: 0.39, segments: 20 },    // front center
  ];

  return (
    <>
      <Float
      floatIntensity={0.3}
      rotationIntensity={0.1}
      speed={0.2}
      >
        {cloudPositions.slice(0, 20).map((cloud, index) => (
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
