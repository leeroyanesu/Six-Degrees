import { useState } from "react";
import { Scene1 } from "./Scene1";

// Scene Manager Component
// Scene Manager Component
export const Experience = ({
  onLoad,
  onStarEnter
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
            onStarEnter={onStarEnter}
            onSceneComplete={handleScene1Complete}
          />
        );
      // case 2:
      //   return <Scene2 ... />;
      default:
        return (
          <Scene1
            onLoad={onLoad}
            onStarEnter={onStarEnter}
            onSceneComplete={handleScene1Complete}
          />
        );
    }
  };

  return renderScene();
};
