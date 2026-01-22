import { OrbitControls, Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { FloatingIsland } from "./FloatingIsland";
import { AnimatedClouds } from "./AnimatedClouds";
import { Infinite } from "./Infinite";
import { Star } from "./Star";
import { useRef, Suspense, useEffect } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";
import { Physics } from "@react-three/rapier";
import { v4 as uuidv4 } from "uuid";

export const Scene1 = ({
  onLoad,
  onStarEnter,
  onSceneComplete
}) => {
  const directionalLightRef = useRef();
  const directionalLightRef1 = useRef();

  useEffect(() => {
    // Delay to ensure everything is loaded
    const timer = setTimeout(() => {
      if (onLoad) onLoad();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onLoad]);

  // Check if all questions are passed to complete the scene
  // Check if all questions are passed logic removed for new game loop
  // Future scene completion logic can be added here based on collected stars if needed

  const { showPerf, showPhysicsDebug } = useControls("Debug", {
    showPerf: { value: false, label: "Show Performance Monitor" },
    showPhysicsDebug: { value: false, label: "Show Physics Colliders" }
  });


  return (
    <>

      {showPerf && <Perf position="top-left" />}
      {/* Sky */}
      <Sky />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={directionalLightRef}
        position={[10, 41, 12]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0001}
      />
      <directionalLight
        ref={directionalLightRef1}
        position={[-45, 71, 0]}
        intensity={1.7}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0001}
      />
      <hemisphereLight
        skyColor="#87CEEB"
        groundColor="#68a0cf"
        intensity={0.4}
      />

      {/* Physics World */}
      <Physics debug={showPhysicsDebug} gravity={[0, -9.81, 0]} timeStep="vary">
        <Suspense fallback={null}>
          {/* Floating Island */}
          <FloatingIsland />

          {/* Star 1 */}
          <Star
            key="star-1"
            position={{ x: -0.5, z: 19 }}
            onPlayerEnter={() => onStarEnter(1)}
          />

          {/* Star 2 */}
          <Star
            key="star-2"
            position={{ x: -23, z: -10 }}
            onPlayerEnter={() => onStarEnter(2)}
          />

          {/* Star 3 */}
          <Star
            key="star-3"
            position={{ x: 18, z: -13 }}
            onPlayerEnter={() => onStarEnter(3)}
          />

          {/* Star 4 */}
          <Star
            key="star-4"
            position={{ x: -2, z: -4 }}
            onPlayerEnter={() => onStarEnter(4)}
          />

          {/* Character */}
          <Infinite />
        </Suspense>
      </Physics>

      {/* Animated Clouds */}
      <AnimatedClouds />
    </>
  );
};
