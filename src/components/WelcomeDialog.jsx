import React, { useState, useEffect, useRef } from 'react';

export const WelcomeDialog = ({ onComplete, start }) => {
    const fullTextRef = useRef("Purpose is rarely just one person. Most meaningful impact comes from people teaming up. In this Degree, we'll explore where Something Bigger might already be happening in your life.");
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const hasCompletedRef = useRef(false);

    useEffect(() => {
        if (start && index < fullTextRef.current.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullTextRef.current.charAt(index));
                setIndex((prev) => prev + 1);
            }, 50); // Typing speed
            return () => clearTimeout(timeout);
        } else if (start && index >= fullTextRef.current.length && !isFinished) {
            setIsFinished(true);
        }
    }, [index, start, isFinished]);

    // Auto-close after typing finishes
    useEffect(() => {
        if (isFinished && !hasCompletedRef.current) {
            hasCompletedRef.current = true;
            const timer = setTimeout(() => {
                onComplete();
            }, 5000); // Wait 5 seconds after typing finishes
            return () => clearTimeout(timer);
        }
    }, [isFinished, onComplete]);

    if (!start) return null;

    return (
        <>
            {/* Full-screen background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/images/background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px) brightness(0.4)',
                zIndex: 9999,
                pointerEvents: 'none'
            }}></div>
            
            {/* Dialog content */}
            <div style={{
                position: 'fixed',
                bottom: '10%',
                left: '50%',
                top:'45%',
                transform: 'translateX(-50%)',
                width: '80%',
                maxWidth: '800px',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                fontFamily: "'Cinzel', serif",
                fontSize: '24px',
                lineHeight: '1.5',
                zIndex: 10000,
                pointerEvents: 'none'
            }}>
                <style>{`
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                    @media (max-width: 768px) {
                        .welcome-dialog-inner {
                            font-size: 14px !important;
                            padding: 12px !important;
                        }
                    }
                `}</style>
                <div className="welcome-dialog-inner" style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    textAlign: 'center'
                }}>
                    {displayedText}
                    <span style={{ opacity: isFinished ? 0 : 1, animation: 'blink 1s infinite', marginLeft: '2px' }}>█</span>
                </div>
            </div>
        </>
    );
};
