import { OrbitControls, Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { FloatingIsland } from "./FloatingIsland";
import { AnimatedClouds } from "./AnimatedClouds";
import { Infinite } from "./Infinite";
import { useRef, Suspense, useEffect } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";
import { Physics } from "@react-three/rapier";

export const Experience = ({ onLoad }) => {
  const directionalLightRef = useRef();
  const directionalLightRef1 = useRef();

  useEffect(() => {
    // Delay to ensure everything is loaded
    const timer = setTimeout(() => {
      if (onLoad) onLoad();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onLoad]);

  const { showPerf, showPhysicsDebug } = useControls("Debug", {
    showPerf: { value: false, label: "Show Performance Monitor" },
    showPhysicsDebug: { value: false, label: "Show Physics Colliders" }
  });

  // useHelper(directionalLightRef, DirectionalLightHelper, 1, "red");
  // useHelper(directionalLightRef1, DirectionalLightHelper, 1, "blue");
  return (
    <>

      {showPerf && <Perf position="top-left" />}
      {/* Sky */}
      <Sky/>

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={directionalLightRef}
        position={[10, 41, 12]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
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
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
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

          {/* Character */}
         <Infinite />
        </Suspense>
      </Physics>

      {/* Animated Clouds */}
      <AnimatedClouds />
    </>
  );
};
