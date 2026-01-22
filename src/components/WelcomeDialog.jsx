import React, { useState, useEffect } from 'react';

export const WelcomeDialog = ({ onComplete, start }) => {
    const fullText = "Purpose is rarely just one person. Most meaningful impact comes from people teaming up. In this Degree, we’ll explore where Something Bigger that might already be happening in your life.";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (start && index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                setIndex((prev) => prev + 1);
            }, 100); // Typing speed
            return () => clearTimeout(timeout);
        } else if (index >= fullText.length) {
            setIsFinished(true);
        }
    }, [index, start, fullText]);

    // Auto-close after a delay when typing is done? 
    // User said "until the dialog is done". 
    // Let's add a small "Continue" prompt or just wait.
    // Given "keyboard disabled", explicit continue is safer so functionality is clear.
    // But request said "subtitle style", which usually implies auto-fade. 
    // Let's do auto-fade after 5 seconds for a smooth cinematic experience.
    useEffect(() => {
        if (isFinished) {
            const timer = setTimeout(() => {
                onComplete();
            }, 5000); // Wait 5 seconds after typing finishes
            return () => clearTimeout(timer);
        }
    }, [isFinished, onComplete]);

    if (!start) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '800px',
            textAlign: 'left',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            fontFamily: "'Cinzel', serif",
            fontSize: '24px',
            lineHeight: '1.5',
            zIndex: 10000,
            pointerEvents: 'none' // Subtitle style usually non-interactive
        }}>
            <div style={{
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}>
                {displayedText}
                <span style={{ opacity: isFinished ? 0 : 1, animation: 'blink 1s infinite', marginLeft: '2px' }}>█</span>
            </div>
            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    );
};
