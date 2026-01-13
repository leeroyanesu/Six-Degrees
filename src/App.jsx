import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva, useControls } from "leva";
import { KeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState, useCallback, memo, useMemo, Suspense } from "react";
import { EcctrlJoystick } from "./ecctrl/src/EcctrlJoystick";

function LoadingScreen({ isLoading }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: isLoading ? 1 : 0,
      pointerEvents: isLoading ? 'all' : 'none',
      transition: 'opacity 0.5s ease-out'
    }}>
      <div style={{
        fontSize: '48px',
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        Six Degrees
      </div>
      <div style={{
        width: '200px',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '50%',
          background: 'white',
          borderRadius: '2px',
          animation: 'loading 1.5s ease-in-out infinite'
        }} />
      </div>
      <div style={{
        marginTop: '20px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '16px'
      }}>
        Loading scene...
      </div>
      <style>{`
        @keyframes loading {
          0% { left: 0; width: 0; }
          50% { left: 25%; width: 50%; }
          100% { left: 100%; width: 0; }
        }
      `}</style>
    </div>
  );
}


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  

  const keyboardMap = useMemo(() => [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ], []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Leva collapsed hidden />
      {(isMobile && !isLoading) && (
        <EcctrlJoystick />
      )}
      <KeyboardControls map={keyboardMap}>
        <Canvas
          flat
          shadows>
          <color attach="background" args={["#ececec"]} />
          <Suspense fallback={null}>
            <Experience onLoad={() => setIsLoading(false)} />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  );
}

export default App;
