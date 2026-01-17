import { OrbitControls, Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { FloatingIsland } from "./FloatingIsland";
import { AnimatedClouds } from "./AnimatedClouds";
import { Infinite } from "./Infinite";
import { Question } from "./Question";
import { useRef, Suspense, useEffect } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";
import { Physics } from "@react-three/rapier";
import { v4 as uuidv4 } from "uuid";

export const Scene1 = ({
  onLoad,
  hasPassedQuestion1,
  hasPassedQuestion2,
  hasPassedQuestion3,
  hasPassedQuestion4,
  onQuestion1Enter,
  onQuestion2Enter,
  onQuestion3Enter,
  onQuestion4Enter,
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
  useEffect(() => {
    if (hasPassedQuestion1 && hasPassedQuestion2 && hasPassedQuestion3 && hasPassedQuestion4) {
      if (onSceneComplete) {
        // Delay to allow final popup to close
        const completeTimer = setTimeout(() => {
          onSceneComplete();
        }, 1000);
        return () => clearTimeout(completeTimer);
      }
    }
  }, [hasPassedQuestion1, hasPassedQuestion2, hasPassedQuestion3, hasPassedQuestion4, onSceneComplete]);

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

          {/* Question Mark 1 - Info Popup */}
          <Question
            key="question-1"
            position={{ x: -0.5, z: 19 }}
            hasPassed={hasPassedQuestion1}
            onPlayerEnter={onQuestion1Enter}
          />

          {/* Question Mark 2 - Exercise Popup (only shows after first is passed) */}
          {hasPassedQuestion1 && (
            <Question
              key="question-2"
              position={{ x: -23, z: -10 }}
              hasPassed={hasPassedQuestion2}
              onPlayerEnter={onQuestion2Enter}
            />
          )}

          {/* Question Mark 3 - Keep Practice Popup (only shows after third is passed)  */}
          {hasPassedQuestion2 && (
            <Question
              key="question-3"
              position={{ x: 18, z: -13 }}
              hasPassed={hasPassedQuestion3}
              onPlayerEnter={onQuestion3Enter}
            />
          )}


          {/* Question Mark 4 - Wonderous Relationship Popup (only shows after second is passed)*/}
          {hasPassedQuestion3 && (
            <Question
              key="question-4"
              position={{ x: -2, z: -4 }}
              hasPassed={hasPassedQuestion4}
              onPlayerEnter={onQuestion4Enter}
            />
          )}

          {/* Character */}
          <Infinite />
        </Suspense>
      </Physics>

      {/* Animated Clouds */}
      <AnimatedClouds />
    </>
  );
};
