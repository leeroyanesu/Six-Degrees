import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SomethingBiggerPopup } from "./components/SomethingBiggerPopup";
import { NurtureExercisePopup } from "./components/NurtureExercisePopup";
import { WonderousRelationshipPopup } from "./components/WonderousRelationshipPopup";
import { KeepPracticePopup } from "./components/KeepPracticePopup";
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
  
  // First question (info popup) states
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [hasPassedQuestion1, setHasPassedQuestion1] = useState(false);
  
  // Second question (exercise popup) states
  const [isExercisePopupOpen, setIsExercisePopupOpen] = useState(false);
  const [hasPassedQuestion2, setHasPassedQuestion2] = useState(false);
  
  // Third question (wonderous relationship popup) states
  const [isWonderousPopupOpen, setIsWonderousPopupOpen] = useState(false);
  const [hasPassedQuestion3, setHasPassedQuestion3] = useState(false);
  
  // Fourth question (keep practice popup) states
  const [isPracticePopupOpen, setIsPracticePopupOpen] = useState(false);
  const [hasPassedQuestion4, setHasPassedQuestion4] = useState(false);

  const handleQuestion1Enter = () => {
    console.log("Question 1 triggered");
    if (!hasPassedQuestion1) {
      setIsInfoPopupOpen(true);
    }
  };

  const handleQuestion2Enter = () => {
    console.log("Question 2 triggered");
    if (!hasPassedQuestion2) {
      setIsExercisePopupOpen(true);
    }
  };

  const handleQuestion3Enter = () => {
    console.log("Question 3 triggered");
    if (!hasPassedQuestion3) {
      setIsWonderousPopupOpen(true);
    }
  };

  const handleQuestion4Enter = () => {
    console.log("Question 4 triggered");
    if (!hasPassedQuestion4) {
      setIsPracticePopupOpen(true);
    }
  };

  // Only "Continue Exploring" marks question as passed and closes popup
  const handleInfoContinue = () => {
    setIsInfoPopupOpen(false);
    setHasPassedQuestion1(true);
  };

  const handleExerciseContinue = () => {
    setIsExercisePopupOpen(false);
    setHasPassedQuestion2(true);
  };

  const handleWonderousContinue = () => {
    setIsWonderousPopupOpen(false);
    setHasPassedQuestion3(true);
  };

  const handlePracticeContinue = () => {
    setIsPracticePopupOpen(false);
    setHasPassedQuestion4(true);
  };

  // X button only closes popup, doesn't mark as passed
  const handleInfoClose = () => {
    setIsInfoPopupOpen(false);
  };

  const handleExerciseClose = () => {
    setIsExercisePopupOpen(false);
  };

  const handleWonderousClose = () => {
    setIsWonderousPopupOpen(false);
  };

  const handlePracticeClose = () => {
    setIsPracticePopupOpen(false);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  

  const isAnyPopupOpen = isInfoPopupOpen || isExercisePopupOpen || isWonderousPopupOpen || isPracticePopupOpen;

  const keyboardMap = useMemo(() => [
    { name: 'forward', keys: isAnyPopupOpen ? [] : ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: isAnyPopupOpen ? [] : ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: isAnyPopupOpen ? [] : ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: isAnyPopupOpen ? [] : ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: isAnyPopupOpen ? [] : ['Space'] },
    { name: 'run', keys: isAnyPopupOpen ? [] : ['Shift'] },
  ], [isAnyPopupOpen]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Leva collapsed  hidden/>
      {(isMobile && !isLoading) && (
        <EcctrlJoystick />
      )}
      <KeyboardControls map={keyboardMap}>
        <Canvas
          flat
          shadows>
          <color attach="background" args={["#ececec"]} />
          <Suspense fallback={null}>
            <Experience 
              onLoad={() => setIsLoading(false)} 
              hasPassedQuestion1={hasPassedQuestion1}
              hasPassedQuestion2={hasPassedQuestion2}
              hasPassedQuestion3={hasPassedQuestion3}
              hasPassedQuestion4={hasPassedQuestion4}
              onQuestion1Enter={handleQuestion1Enter}
              onQuestion2Enter={handleQuestion2Enter}
              onQuestion3Enter={handleQuestion3Enter}
              onQuestion4Enter={handleQuestion4Enter}
            />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      
      {/* Something Bigger Info Popup - Outside Canvas */}
      <SomethingBiggerPopup 
        isOpen={isInfoPopupOpen} 
        onClose={handleInfoClose}
        onContinue={handleInfoContinue}
      />
      
      {/* Nurture Exercise Popup - Outside Canvas */}
      <NurtureExercisePopup 
        isOpen={isExercisePopupOpen} 
        onClose={handleExerciseClose}
        onContinue={handleExerciseContinue}
      />
      
      {/* Wonderous Relationship Popup - Outside Canvas */}
      <WonderousRelationshipPopup 
        isOpen={isWonderousPopupOpen} 
        onClose={handleWonderousClose}
        onContinue={handleWonderousContinue}
      />
      
      {/* Keep Practice Popup - Outside Canvas */}
      <KeepPracticePopup 
        isOpen={isPracticePopupOpen} 
        onClose={handlePracticeClose}
        onContinue={handlePracticeContinue}
      />
    </>
  );
}

export default App;
