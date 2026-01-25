import React, { useState, useEffect, useRef } from 'react';

export const InstructionsDialog = ({ onComplete, start, isMobile }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const hasCompletedRef = useRef(false);
    
    const fullText = isMobile 
        ? "• Use the joystick (bottom left) to move\n• Find glowing stars (people who teamed up)\n• Complete tasks to earn badges\n• Draw the Second Degree island closer!"
        : "• WASD/Arrows to move • Space to jump • Shift to run\n• Find glowing stars (people who teamed up)\n• Complete tasks to earn badges\n• Draw the Second Degree island closer!";

    useEffect(() => {
        if (!start || hasCompletedRef.current) return;
        
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                setIndex((prev) => prev + 1);
            }, 35);
            return () => clearTimeout(timeout);
        } else if (index >= fullText.length) {
            setIsFinished(true);
        }
    }, [index, start, fullText]);

    // Auto-close after typing finishes
    useEffect(() => {
        if (isFinished && !hasCompletedRef.current) {
            hasCompletedRef.current = true;
            const timer = setTimeout(() => {
                onComplete();
            }, 7000); // Wait 7 seconds after typing finishes
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
            width: '85%',
            maxWidth: '850px',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            fontFamily: "'Cinzel', serif",
            fontSize: '22px',
            lineHeight: '1.6',
            zIndex: 10000,
            pointerEvents: 'none'
        }}>
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 768px) {
                    .instructions-dialog-inner {
                        font-size: 14px !important;
                        padding: 14px !important;
                    }
                }
            `}</style>
            <div className="instructions-dialog-inner" style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(20, 20, 60, 0.7))',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid rgba(255, 215, 0, 0.4)',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)',
                textAlign: 'center',
                animation: 'slideUp 0.6s ease-out'
            }}>
                <div style={{
                    marginBottom: '15px',
                    fontSize: '28px',
                    color: '#FFD700',
                    fontWeight: 600,
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
                }}>
                    ⭐ Your Mission ⭐
                </div>
                <div style={{ whiteSpace: 'pre-line', textAlign: 'left', display: 'inline-block' }}>
                    {displayedText}
                    <span style={{ 
                        opacity: isFinished ? 0 : 1, 
                        animation: 'blink 1s infinite', 
                        marginLeft: '2px' 
                    }}>█</span>
                </div>
            </div>
        </div>
    );
};
