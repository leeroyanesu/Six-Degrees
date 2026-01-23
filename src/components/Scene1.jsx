import { OrbitControls, Sky, PositionalAudio, Sparkles } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { FloatingIsland } from "./FloatingIsland";
import { AnimatedClouds } from "./AnimatedClouds";
import { Infinite } from "./Infinite";
import { Star } from "./Star";
import { useRef, Suspense, useEffect, useState } from "react";
import { useControls } from "leva";
import { Physics } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const Scene1 = ({
  onLoad,
  onTextComplete,
  onStarEnter,
  onSceneComplete,
  hiddenStars = new Set(),
  fadeProgress = 1,
  onFadeProgress
}) => {
  const directionalLightRef = useRef();
  const directionalLightRef1 = useRef();
  const { camera, scene } = useThree();
  const [textTypingComplete, setTextTypingComplete] = useState(false);
  const [readyForFade, setReadyForFade] = useState(false);
  const [fadeComplete, setFadeComplete] = useState(false);
  const fadeStartTime = useRef(null);

  // Notify scene is ready
  useEffect(() => {
    // Notify that scene is ready to show title text
    if (onLoad) onLoad();
    
    // Initial fade notification
    if (onFadeProgress) onFadeProgress(0);
    
    // Simulate text typing completion after 2 seconds
    const typingTimer = setTimeout(() => {
      setTextTypingComplete(true);
    }, 2000);
    
    return () => clearTimeout(typingTimer);
  }, [onLoad, onFadeProgress]);
  
  // Wait 3 seconds after typing completes, then start fade-in
  useEffect(() => {
    if (!textTypingComplete) return;
    
    const delayTimer = setTimeout(() => {
      setReadyForFade(true);
      fadeStartTime.current = Date.now();
      
      // Remove loading screen
      if (onTextComplete) onTextComplete();
    }, 3000);
    
    return () => clearTimeout(delayTimer);
  }, [textTypingComplete, onTextComplete]);

  // Fade-in animation - only runs when ready
  useFrame(() => {
    if (!readyForFade || fadeComplete || !fadeStartTime.current) return;
    
    const elapsed = (Date.now() - fadeStartTime.current) / 1000;
    const fadeDuration = 3; // 3 seconds for fade-in
    
    if (elapsed < fadeDuration) {
      const t = Math.min(elapsed / fadeDuration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      
      // Report fade progress to parent
      if (onFadeProgress) onFadeProgress(eased);
    } else {
      setFadeComplete(true);
      if (onFadeProgress) onFadeProgress(1);
    }
  });

  // Check if all questions are passed to complete the scene
  // Check if all questions are passed logic removed for new game loop
  // Future scene completion logic can be added here based on collected stars if needed

  const { showPerf, showPhysicsDebug } = useControls("Debug", {
    showPerf: { value: false, label: "Show Performance Monitor" },
    showPhysicsDebug: { value: false, label: "Show Physics Colliders" }
  });


  return (
    <>
      {/* Scene fog for atmosphere */}
      <fog attach="fog" args={['#d4e9f7', 30, 120]} />

      {showPerf && <Perf position="top-left" />}
      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0.6}
        azimuth={0.25}
      />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={directionalLightRef}
        position={[10, 41, 12]}
        intensity={1 * (readyForFade ? fadeProgress : 0.3)}
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
          
          {/* Magical sparkles around the island */}
          <Sparkles
            count={150}
            scale={[60, 25, 60]}
            position={[0, 12, 0]}
            size={3}
            speed={0.3}
            opacity={0.6 * fadeProgress}
            color="#FFD700"
          />

          {/* Star 1 */}
          {!hiddenStars.has(1) && (
            <Star
              key="star-1"
              position={{ x: -0.5, z: 19 }}
              onPlayerEnter={() => onStarEnter(1)}
            />
          )}

          {/* Star 2 */}
          {!hiddenStars.has(2) && (
            <Star
              key="star-2"
              position={{ x: -23, z: -10 }}
              onPlayerEnter={() => onStarEnter(2)}
            />
          )}

          {/* Star 3 */}
          {!hiddenStars.has(3) && (
            <Star
              key="star-3"
              position={{ x: 18, z: -13 }}
              onPlayerEnter={() => onStarEnter(3)}
            />
          )}

          {/* Star 4 */}
          {!hiddenStars.has(4) && (
            <Star
              key="star-4"
              position={{ x: -2, z: -4 }}
              onPlayerEnter={() => onStarEnter(4)}
            />
          )}

          {/* Star 5 */}
          {!hiddenStars.has(5) && (
            <Star
              key="star-5"
              position={{ x: 12, z: 8 }}
              onPlayerEnter={() => onStarEnter(5)}
            />
          )}

          {/* Star 6 */}
          {!hiddenStars.has(6) && (
            <Star
              key="star-6"
              position={{ x: -15, z: 5 }}
              onPlayerEnter={() => onStarEnter(6)}
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
