import { useState } from "react";
import { Scene1 } from "./Scene1";

// Scene Manager Component
export const Experience = ({
  onLoad,
  hasPassedQuestion1,
  hasPassedQuestion2,
  hasPassedQuestion3,
  hasPassedQuestion4,
  onQuestion1Enter,
  onQuestion2Enter,
  onQuestion3Enter,
  onQuestion4Enter
}) => {
  const [currentScene, setCurrentScene] = useState(1);

  const handleScene1Complete = () => {
    console.log("Scene 1 completed! Moving to Scene 2...");
    // setCurrentScene(2); // Uncomment when Scene2 is ready
  };

  // Render current scene
  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return (
          <Scene1
            onLoad={onLoad}
            hasPassedQuestion1={hasPassedQuestion1}
            hasPassedQuestion2={hasPassedQuestion2}
            hasPassedQuestion3={hasPassedQuestion3}
            hasPassedQuestion4={hasPassedQuestion4}
            onQuestion1Enter={onQuestion1Enter}
            onQuestion2Enter={onQuestion2Enter}
            onQuestion3Enter={onQuestion3Enter}
            onQuestion4Enter={onQuestion4Enter}
            onSceneComplete={handleScene1Complete}
          />
        );
      // case 2:
      //   return <Scene2 ... />;
      default:
        return (
          <Scene1
            onLoad={onLoad}
            hasPassedQuestion1={hasPassedQuestion1}
            hasPassedQuestion2={hasPassedQuestion2}
            hasPassedQuestion3={hasPassedQuestion3}
            hasPassedQuestion4={hasPassedQuestion4}
            onQuestion1Enter={onQuestion1Enter}
            onQuestion2Enter={onQuestion2Enter}
            onQuestion3Enter={onQuestion3Enter}
            onQuestion4Enter={onQuestion4Enter}
            onSceneComplete={handleScene1Complete}
          />
        );
    }
  };

  return renderScene();
};
