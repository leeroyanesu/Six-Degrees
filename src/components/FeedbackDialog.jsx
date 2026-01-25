import React, { useState, useEffect } from 'react';

export const FeedbackDialog = ({ message, onComplete, start, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [shouldStart, setShouldStart] = useState(false);

    // Handle the initial delay
    useEffect(() => {
        if (start && delay > 0) {
            const timer = setTimeout(() => {
                setShouldStart(true);
            }, delay);
            return () => clearTimeout(timer);
        } else if (start) {
            setShouldStart(true);
        }
    }, [start, delay]);

    // Typing animation
    useEffect(() => {
        if (shouldStart && index < message.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + message.charAt(index));
                setIndex((prev) => prev + 1);
            }, 40); // Typing speed
            return () => clearTimeout(timeout);
        } else if (index >= message.length) {
            setIsFinished(true);
        }
    }, [index, shouldStart, message]);

    // Auto-close after text finishes
    useEffect(() => {
        if (isFinished) {
            const timer = setTimeout(() => {
                onComplete();
            }, 3000); // Wait 3 seconds after typing finishes
            return () => clearTimeout(timer);
        }
    }, [isFinished, onComplete]);

    if (!start) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '10%',
            left: '50%',
            top: '45%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '700px',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            fontFamily: "'Cinzel', serif",
            fontSize: '22px',
            lineHeight: '1.5',
            zIndex: 10000,
            pointerEvents: 'none'
        }}>
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 768px) {
                    .feedback-dialog-inner {
                        font-size: 14px !important;
                        padding: 12px !important;
                    }
                }
            `}</style>
            <div className="feedback-dialog-inner" style={{
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '20px',
                borderRadius: '10px',
                border: '2px solid rgba(255, 215, 0, 0.4)',
                boxShadow: '0 0 25px rgba(255, 215, 0, 0.2)',
                textAlign: 'center',
                animation: 'fadeIn 0.5s ease-out'
            }}>
                {displayedText}
                <span style={{ 
                    opacity: isFinished ? 0 : 1, 
                    animation: 'blink 1s infinite', 
                    marginLeft: '2px' 
                }}>█</span>
            </div>
        </div>
    );
};
