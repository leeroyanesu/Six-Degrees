import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
// Removed unused popup imports
import { Scoreboard } from "./components/Scoreboard";
import { Notebook } from "./components/Notebook";
import { LoadingScreen } from "./components/LoadingScreen";
import { WelcomeDialog } from "./components/WelcomeDialog";
import { ImpactorPopup } from "./components/ImpactorPopup";
import { SomethingBiggerIntro } from "./components/SomethingBiggerIntro";
import { NurtureExercisePopup } from "./components/NurtureExercisePopup";
import { WonderousRelationshipPopup } from "./components/WonderousRelationshipPopup";
import { DreamscribingPopup } from "./components/DreamscribingPopup";
import { KeepPracticePopup } from "./components/KeepPracticePopup";
import { ConnectPopup } from "./components/ConnectPopup";
import { WalkingSoundController } from "./components/WalkingSoundController";
import { Leva } from "leva";
import { KeyboardControls } from "@react-three/drei";
import { useEffect, useState, useMemo, Suspense, useRef } from "react";
import { EcctrlJoystick } from "./ecctrl/src/EcctrlJoystick";
import { Howl } from 'howler';
import ReactHowler from 'react-howler';

const IMPACTORS = [
  {
    id: 1,
    name: "Nelson Mandela",
    movement: "The Elders",
    who: "Nelson Mandela was a leader in South Africa who helped end apartheid and became the country's first Black president.",
    didYouKnow: "He helped create The Elders, a group of world leaders who work together for peace and human rights all over the world.",
    reflection: "Why is it helpful to have many wise people working together instead of just one?",
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Nelson_Mandela_1994.jpg'
  },
  {
    id: 2,
    name: "Jane Goodall",
    movement: "Roots & Shoots",
    who: "Jane Goodall is a scientist who became famous for studying chimpanzees and then protecting animals and nature.",
    didYouKnow: "She started Roots & Shoots, where young people in many countries run their own projects to help people, animals and the environment.",
    reflection: "If you joined Roots & Shoots, what is one thing you'd like to work on with others?",
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Deputy_Secretary_Higginbottom_Poses_for_a_Photo_With_Dr._Jane_Goodall_and_the_State_Department%27s_Global_Health_Diplomacy_Director_Jordan_in_Washington_%2822365513310%29_%282%29_%28cropped_2%29.jpg'
  },
  {
    id: 3,
    name: "Wangari Maathai",
    movement: "Green Belt Movement",
    who: "Wangari Maathai was a Kenyan environmental activist and the first African woman to win the Nobel Peace Prize.",
    didYouKnow: "She started the Green Belt Movement, where communities planted millions of trees together to protect the land and support families.",
    reflection: "How does planting trees together make a bigger difference than planting one tree alone?",
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Wangari_Maathai_in_2001.jpg'
  },
  {
    id: 4,
    name: "Sylvia Earle",
    movement: "Mission Blue",
    who: "Sylvia Earle is an ocean explorer and scientist, often called \"Her Deepness.\"",
    didYouKnow: "She founded Mission Blue, which joins many groups to protect ocean areas called Hope Spots all over the world.",
    reflection: "Why do you think the ocean needs many people and groups working together to protect it?",
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dr._Sylvia_Earle%2C_Construction_Worker%3F_%286666200905%29_%28cropped%29.jpg'
  },
  {
    id: 5,
    name: "Greta Thunberg",
    movement: "Fridays for Future",
    who: "Greta Thunberg is a climate activist from Sweden who began striking from school to demand climate action.",
    didYouKnow: "Her one-person strike turned into Fridays for Future, a movement where millions of people in thousands of cities joined climate marches.",
    reflection: "How can one person's action inspire many others to join in?",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Greta_Thunberg_in_November_in_Stockholm_%28cropped%29%282%29.jpg'
  },
  {
    id: 6,
    name: "Malala Yousafzai",
    movement: "Malala Fund",
    who: "Malala Yousafzai is a Pakistani activist for girls' education and the youngest person to win the Nobel Peace Prize.",
    didYouKnow: "She co-founded Malala Fund, which supports local groups in different countries so that more girls can go to school and finish their education.",
    reflection: "Why is it stronger for many local groups to work together for girls' education instead of only one person trying?",
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Malala_Yousafzai_2023_portrait_2x3.jpg'
  }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Game State
  const [collectedStars, setCollectedStars] = useState(new Set());
  const [hiddenStars, setHiddenStars] = useState(new Set());
  const [activeImpactor, setActiveImpactor] = useState(null);
  const [showSomethingBiggerIntro, setShowSomethingBiggerIntro] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [showNurtureExercise, setShowNurtureExercise] = useState(false);
  const [hasSeenNurture, setHasSeenNurture] = useState(false);
  const [showWonderousRelationship, setShowWonderousRelationship] = useState(false);
  const [hasSeenWonderous, setHasSeenWonderous] = useState(false);
  const [showDreamscribing, setShowDreamscribing] = useState(false);
  const [hasSeenDreamscribing, setHasSeenDreamscribing] = useState(false);
  const [showKeepPractice, setShowKeepPractice] = useState(false);
  const [hasSeenKeepPractice, setHasSeenKeepPractice] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [hasSeenConnect, setHasSeenConnect] = useState(false);
  const [badges, setBadges] = useState([]);
  const [myActions, setMyActions] = useState([]);
  const [fadeProgress, setFadeProgress] = useState(0);
  const [showTitleText, setShowTitleText] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const walkingSoundRef = useRef(null);
  const successSoundRef = useRef(null);
  const isWalkingRef = useRef(false);

  // Initialize walking sound
  useEffect(() => {
    walkingSoundRef.current = new Howl({
      src: ['/audio/walking.mp3'],
      loop: true,
      volume: 0.1,
      preload: true
    });

    return () => {
      walkingSoundRef.current?.unload();
    };
  }, []);

  // Initialize success sound
  useEffect(() => {
    successSoundRef.current = new Howl({
      src: ['/audio/success.mp3'],
      volume: 0.3,
      preload: true
    });

    return () => {
      successSoundRef.current?.unload();
    };
  }, []);

  const handleStarEnter = (id) => {
    const impactor = IMPACTORS.find(i => i.id === id);
    if (impactor) {
      setActiveImpactor(impactor);
    }
  };

  const handleImpactorClose = () => {
    if (activeImpactor) {
      const isFirstStar = collectedStars.size === 0 && !hasSeenIntro;
      const isSecondStar = collectedStars.size === 1 && hasSeenIntro && !hasSeenNurture;
      const isThirdStar = collectedStars.size === 2 && hasSeenNurture && !hasSeenWonderous;
      const isFourthStar = collectedStars.size === 3 && hasSeenWonderous && !hasSeenDreamscribing;
      const isFifthStar = collectedStars.size === 4 && hasSeenDreamscribing && !hasSeenKeepPractice;
      const isSixthStar = collectedStars.size === 5 && hasSeenKeepPractice && !hasSeenConnect;

      setCollectedStars(prev => {
        const newSet = new Set(prev);
        newSet.add(activeImpactor.id);
        return newSet;
      });

      const currentStarId = activeImpactor.id;
      setActiveImpactor(null);

      // Show Something Bigger intro after first star
      if (isFirstStar) {
        setTimeout(() => {
          setShowSomethingBiggerIntro(true);
        }, 300);
      }
      // Show Nurture exercise after second star
      else if (isSecondStar) {
        setTimeout(() => {
          setShowNurtureExercise(true);
        }, 300);
      }
      // Show Wondrous Relationship exercise after third star
      else if (isThirdStar) {
        setTimeout(() => {
          setShowWonderousRelationship(true);
        }, 300);
      }
      // Show Dreamscribing exercise after fourth star
      else if (isFourthStar) {
        setTimeout(() => {
          setShowDreamscribing(true);
        }, 300);
      }
      // Show Keep Practice exercise after fifth star
      else if (isFifthStar) {
        setTimeout(() => {
          setShowKeepPractice(true);
        }, 300);
      }
      // Show Connect exercise after sixth star
      else if (isSixthStar) {
        setTimeout(() => {
          setShowConnect(true);
        }, 300);
      }
    }
  };

  const handleIntroComplete = () => {
    setShowSomethingBiggerIntro(false);
    setHasSeenIntro(true);

    // Play success sound
    if (successSoundRef.current) {
      successSoundRef.current.play();
    }

    // Add badge
    setBadges(prev => [...prev, {
      id: 'something-bigger-key',
      name: 'Something Bigger – Key Idea',
      description: 'Something Bigger is what happens when people connect their purposes and support each other. Instead of trying to do everything alone, they work together in partnership, and what they create is bigger and more meaningful than anything they could have done by themselves.'
    }]);

    // Hide the star that triggered the intro
    if (collectedStars.size > 0) {
      const firstStarId = Array.from(collectedStars)[0];
      setHiddenStars(prev => {
        const newSet = new Set(prev);
        newSet.add(firstStarId);
        return newSet;
      });
    }
  };

  const handleNurtureComplete = () => {
    setShowNurtureExercise(false);
    setHasSeenNurture(true);

    // Play success sound
    if (successSoundRef.current) {
      successSoundRef.current.play();
    }

    // Add badge
    setBadges(prev => [...prev, {
      id: 'partnership-spotlight',
      name: 'Partnership Spotlight',
      description: 'Some of your relationships are already creating Something Bigger. When you notice and appreciate them, you can protect them, grow them, and let them guide what you do next.'
    }]);

    // Hide the star that triggered the nurture exercise
    if (collectedStars.size > 1) {
      const secondStarId = Array.from(collectedStars)[1];
      setHiddenStars(prev => {
        const newSet = new Set(prev);
        newSet.add(secondStarId);
        return newSet;
      });
    }
  };

  const handleWonderousComplete = (actionEntry) => {
    setShowWonderousRelationship(false);
    setHasSeenWonderous(true);

    // Play success sound
    if (successSoundRef.current) {
      successSoundRef.current.play();
    }

    // Add action to my actions
    setMyActions(prev => [...prev, actionEntry]);

    // Hide the star that triggered the wondrous exercise
    if (collectedStars.size > 2) {
      const thirdStarId = Array.from(collectedStars)[2];
      setHiddenStars(prev => {
        const newSet = new Set(prev);
        newSet.add(thirdStarId);
        return newSet;
      });
    }
  };

  const handleDreamscribingComplete = (actionEntries) => {
    setShowDreamscribing(false);
    setHasSeenDreamscribing(true);

    // Play success sound
    if (successSoundRef.current) {
      successSoundRef.current.play();
    }

    // Add all dream actions to my actions
    setMyActions(prev => [...prev, ...actionEntries]);

    // Add badge
    setBadges(prev => [...prev, {
      id: 'degree-1-act',
      name: 'Degree 1 ACT',
      description: 'You\'ve taken the first step in the ACT practice. By dreamscribing, you\'ve given your aspirations a voice and created a foundation for meaningful action. Your dreams are no longer just thoughts—they\'re commitments waiting to unfold.'
    }]);

    // Hide the star that triggered the dreamscribing exercise
    if (collectedStars.size > 3) {
      const fourthStarId = Array.from(collectedStars)[3];
      setHiddenStars(prev => {
        const newSet = new Set(prev);
        newSet.add(fourthStarId);
        return newSet;
      });
    }
  };

  const handleKeepPracticeComplete = () => {
    setShowKeepPractice(false);
    setHasSeenKeepPractice(true);

    // Play success sound
    if (successSoundRef.current) {
      successSoundRef.current.play();
    }

    // Add card (not a badge, but a completion card)
    setBadges(prev => [...prev, {
      id: 'keeping-something-bigger-alive',
      name: 'Keeping Something Bigger Alive',
      description: 'Something Bigger happens when people connect their purposes and support each other. This First Degree of Connection is about partnerships—where two people create more together than they could alone. By noticing these partnerships in your life, nurturing them, and taking small actions to make them more wondrous, you keep Something Bigger alive.'
    }]);

    // Hide the star that triggered the keep practice exercise
    if (collectedStars.size > 4) {
      const fifthStarId = Array.from(collectedStars)[4];
      setHiddenStars(prev => {
        const newSet = new Set(prev);
        newSet.add(fifthStarId);
        return newSet;
      });
    }
  };

  const handleConnectComplete = (data) => {
    setShowConnect(false);
    setHasSeenConnect(true);

    // Play success sound
    if (successSoundRef.current) {
      successSoundRef.current.play();
    }

    // Handle both object and string parameters for backward compatibility
    const reflectionText = typeof data === 'object' ? data.reflection : data;
    const willTrackActions = typeof data === 'object' ? data.trackActions : arguments[1];

    // Add reflection to My Actions if provided
    if (reflectionText && typeof reflectionText === 'string' && reflectionText.trim()) {
      setMyActions(prev => [...prev, {
        type: 'reflection',
        text: `First Degree Reflection: ${reflectionText}`,
        timestamp: new Date().toISOString()
      }]);
    }

    // Add tracking commitment if enabled
    if (willTrackActions) {
      setMyActions(prev => [...prev, {
        type: 'commitment',
        text: 'I will track my progress in bringing wondrous relationships to life.',
        timestamp: new Date().toISOString()
      }]);
    }

    // Add final explorer badge
    setBadges(prev => [...prev, {
      id: 'something-bigger-explorer',
      name: 'Something Bigger Explorer',
      description: 'You have completed the First Degree of Connection. You now understand how partnerships create Something Bigger, and you have tools to nurture these relationships in your life. This is just the beginning—there are 5 more degrees to explore!'
    }]);

    // Hide the star that triggered the connect exercise
    if (collectedStars.size >= 6) {
      const sixthStarId = Array.from(collectedStars)[5];
      setHiddenStars(prev => {
        const newSet = new Set(prev);
        newSet.add(sixthStarId);
        return newSet;
      });
    }
  };

  const handleAudioUnlock = () => {
    setAudioUnlocked(true);
    setShowAudioPrompt(false);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isPopupOpen = showWelcome || activeImpactor !== null || showSomethingBiggerIntro || showNurtureExercise || showWonderousRelationship || showDreamscribing || showKeepPractice || showConnect;

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

  const badgeCount = badges.length;

  return (
    <>
      
      <LoadingScreen isLoading={isLoading} />
      <Leva collapsed hidden />
      {(isMobile && !isLoading && !isPopupOpen) && (
        <EcctrlJoystick />
      )}
      <KeyboardControls map={keyboardMap}>
        <WalkingSoundController walkingSoundRef={walkingSoundRef} audioUnlocked={audioUnlocked} />
        <Canvas flat shadows>
          <color attach="background" args={["#ececec"]} />
          <Suspense fallback={null}>
            <Experience
              onLoad={() => setShowTitleText(true)}
              onTextComplete={() => setIsLoading(false)}
              onFadeProgress={(progress) => setFadeProgress(progress)}
              onStarEnter={handleStarEnter}
              hiddenStars={hiddenStars}
              fadeProgress={fadeProgress}
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

      {showSomethingBiggerIntro && (
        <SomethingBiggerIntro
          onComplete={handleIntroComplete}
        />
      )}

      {showNurtureExercise && (
        <NurtureExercisePopup
          onComplete={handleNurtureComplete}
        />
      )}

      {showWonderousRelationship && (
        <WonderousRelationshipPopup
          onComplete={handleWonderousComplete}
        />
      )}

      {showDreamscribing && (
        <DreamscribingPopup
          onComplete={handleDreamscribingComplete}
        />
      )}

      {showKeepPractice && (
        <KeepPracticePopup
          onComplete={handleKeepPracticeComplete}
        />
      )}

      {showConnect && (
        <ConnectPopup
          onComplete={handleConnectComplete}
        />
      )}

      {/* Fade-in overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'black',
          opacity: 1 - fadeProgress,
          pointerEvents: 'none',
          zIndex: (!isLoading && !showWelcome) ? -10 : 1000,
          transition: 'opacity 0.3s'
        }}
      />

      {/* Title text animation */}
      {showTitleText && isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1001,
            fontFamily: 'Cinzel, Georgia, serif',
            color: '#FFD700',
            fontSize: '48px',
            fontWeight: 700,
            textAlign: 'center',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            animation: 'titleFadeIn 2s ease-out forwards',
            pointerEvents: 'none'
          }}
        >
          <style>{`
            @keyframes titleFadeIn {
              0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
              50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
              100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
            }
          `}</style>
          The First Degree of Connection
        </div>
      )}

      <ReactHowler
        src={'/audio/background.mp3'}
        playing={!isLoading && audioUnlocked}
        loop
        volume={0.2}
      />

      {/* Audio unlock prompt */}
      {showAudioPrompt && !isLoading && (
        <div
          onClick={handleAudioUnlock}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10001,
            cursor: 'pointer',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 215, 0, 0.5)',
              borderRadius: '20px',
              padding: '40px 60px',
              textAlign: 'center',
              color: '#FFD700',
              fontFamily: 'Cinzel, Georgia, serif',
              maxWidth: '500px'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔊</div>
            <div style={{ fontSize: '24px', fontWeight: 600, marginBottom: '15px' }}>
              Enable Audio
            </div>
            <div style={{ fontSize: '16px', opacity: 0.8, marginBottom: '25px' }}>
              Click anywhere to start your journey with sound
            </div>
            <div
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                borderRadius: '10px',
                color: '#000',
                fontSize: '18px',
                fontWeight: 600,
                animation: 'pulse 2s infinite'
              }}
            >
              Click to Continue
            </div>
            <style>{`
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.9; }
              }
            `}</style>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
