import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
// Removed unused popup imports
import { Scoreboard } from "./components/Scoreboard";
import { Notebook } from "./components/Notebook";
import { LoadingScreen } from "./components/LoadingScreen";
import { WelcomeDialog } from "./components/WelcomeDialog";
import { ImpactorPopup } from "./components/ImpactorPopup";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";
import { useEffect, useState, useMemo, Suspense } from "react";
import { EcctrlJoystick } from "./ecctrl/src/EcctrlJoystick";

const IMPACTORS = [
  {
    id: 1,
    name: "Orville Wright",
    partner: "Wilbur Wright",
    fact: "Together they achieved the first powered, sustained, and controlled airplane flight.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Orville_Wright_1905-crop.jpg/960px-Orville_Wright_1905-crop.jpg',
    partnerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Wilbur_Wright-crop.jpg/960px-Wilbur_Wright-crop.jpg'
  },
  {
    id: 2,
    name: "Marie Curie",
    partner: "Pierre Curie",
    fact: "This husband-and-wife duo pioneered research on radioactivity, winning a Nobel Prize together.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg',
    partnerImage: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Pierre_Curie_by_Dujardin_c1906.jpg'
  },
  {
    id: 3,
    name: "Steve Jobs",
    partner: "Steve Wozniak",
    fact: "The two Steves combined marketing vision and engineering genius to launch the personal computer revolution.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
    partnerImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Steve_Wozniak_by_Gage_Skidmore_3_%28cropped%29.jpg'
  },
  {
    id: 4,
    name: "Paul McCartney",
    partner: "John Lennon",
    fact: "Their songwriting partnership created some of the most influential music in history with The Beatles.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/MaccaLyricsRFH051121_%2815_of_18%29_%28updated%29_%28cropped%29.jpg',
    partnerImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/John_Lennon_%22Walls_and_Bridges%22_1974_press_photo_2_%28color%29_%28cropped%29.jpg'
  }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Game State
  const [collectedStars, setCollectedStars] = useState(new Set());
  const [activeImpactor, setActiveImpactor] = useState(null);

  const handleStarEnter = (id) => {
    const impactor = IMPACTORS.find(i => i.id === id);
    if (impactor) {
      setActiveImpactor(impactor);
    }
  };

  const handleImpactorClose = () => {
    if (activeImpactor) {
      setCollectedStars(prev => {
        const newSet = new Set(prev);
        newSet.add(activeImpactor.id);
        return newSet;
      });
      setActiveImpactor(null);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isPopupOpen = showWelcome || activeImpactor !== null;

  const keyboardMap = useMemo(() => [
    { name: 'forward', keys: isPopupOpen ? [] : ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: isPopupOpen ? [] : ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: isPopupOpen ? [] : ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: isPopupOpen ? [] : ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: isPopupOpen ? [] : ['Space'] },
    { name: 'run', keys: isPopupOpen ? [] : ['Shift'] },
  ], [isPopupOpen]);

  // Derived Props
  const notebookData = IMPACTORS.map(i => ({
    name: i.name,
    checked: collectedStars.has(i.id)
  }));

  const badgeCount = Math.floor(collectedStars.size / 2);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Leva collapsed hidden />
      {(isMobile && !isLoading && !isPopupOpen) && (
        <EcctrlJoystick />
      )}
      <KeyboardControls map={keyboardMap}>
        <Canvas flat shadows>
          <color attach="background" args={["#ececec"]} />
          <Suspense fallback={null}>
            <Experience
              onLoad={() => setIsLoading(false)}
              onStarEnter={handleStarEnter}
            />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* UI Overlays */}
      <Scoreboard badgeCount={badgeCount} />
      <Notebook entries={notebookData} />

      <WelcomeDialog
        start={!isLoading && showWelcome}
        onComplete={() => setShowWelcome(false)}
      />

      <ImpactorPopup
        data={activeImpactor}
        onClose={handleImpactorClose}
      />
    </>
  );
}

export default App;
