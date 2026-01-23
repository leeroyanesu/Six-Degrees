import { useEffect, useRef } from 'react';
import { useKeyboardControls } from '@react-three/drei';

export function WalkingSoundController({ walkingSoundRef, audioUnlocked }) {
  const isPlayingRef = useRef(false);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);

  useEffect(() => {
    if (!audioUnlocked || !walkingSoundRef.current) return;

    const isMoving = forward || backward || leftward || rightward;

    if (isMoving && !isPlayingRef.current) {
      walkingSoundRef.current.play();
      isPlayingRef.current = true;
    } else if (!isMoving && isPlayingRef.current) {
      walkingSoundRef.current.pause();
      isPlayingRef.current = false;
    }
  }, [forward, backward, leftward, rightward, audioUnlocked, walkingSoundRef]);

  return null;
}
