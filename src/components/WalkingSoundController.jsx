import { useEffect, useRef } from 'react';
import { useKeyboardControls } from '@react-three/drei';

export function WalkingSoundController({ walkingSoundRef, audioUnlocked, isPopupOpen = false }) {
  const isPlayingRef = useRef(false);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);

  useEffect(() => {
    if (!audioUnlocked || !walkingSoundRef.current || isPopupOpen) {
      // Stop sound if popup opens
      if (isPlayingRef.current && walkingSoundRef.current) {
        walkingSoundRef.current.pause();
        isPlayingRef.current = false;
      }
      return;
    }

    const isMoving = forward || backward || leftward || rightward;

    if (isMoving && !isPlayingRef.current) {
      walkingSoundRef.current.play();
      isPlayingRef.current = true;
    } else if (!isMoving && isPlayingRef.current) {
      walkingSoundRef.current.pause();
      isPlayingRef.current = false;
    }
  }, [forward, backward, leftward, rightward, audioUnlocked, walkingSoundRef, isPopupOpen]);

  return null;
}
