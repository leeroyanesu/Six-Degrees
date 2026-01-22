import React from 'react';

export const LoadingScreen = ({ isLoading }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'radial-gradient(circle at center, #800000 0%, #3d0043 50%, #0f0f23 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientBG 15s ease infinite',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            opacity: isLoading ? 1 : 0,
            pointerEvents: isLoading ? 'all' : 'none',
            transition: 'opacity 0.8s ease-in-out'
        }}>
            {/* Animated Infinity Loader */}
            <div className="infinity-loader" style={{ position: 'relative', width: '120px', height: '60px' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 50">
                    <defs>
                        <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="50%" stopColor="#E0E0E0" />
                            <stop offset="100%" stopColor="#FFFFFF" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="none"
                        stroke="url(#loader-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        d="M50,25 C35,5 10,5 10,25 C10,45 35,45 50,25 C65,5 90,5 90,25 C90,45 65,45 50,25"
                        className="infinity-path"
                    />
                </svg>
            </div>

            {/* <h2 style={{
                marginTop: '40px',
                color: '#FFFFFF', // WHITE Text
                fontSize: '2.5rem',
                letterSpacing: '8px',
                fontFamily: "'Cinzel', serif", // More elegant font if available, fallback to serif
                textTransform: 'uppercase',
                textShadow: '0 0 15px rgba(255, 215, 0, 0.6), 0 0 30px rgba(61, 0, 67, 0.8)',
                animation: 'pulseText 3s infinite ease-in-out'
            }}>
                Six Degrees
            </h2> */}

            <div style={{
                marginTop: '5rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                fontStyle: 'italic',
                letterSpacing: '2px',
                borderTop: '1px solid rgba(255, 215, 0, 0.5)', // Gold border
                paddingTop: '10px',
                width: '200px',
                textAlign: 'center',
                textShadow: '0 0 8px rgba(255, 215, 0, 0.4)' // Gold text shadow
            }}>
                Loading Experience...
            </div>

            <style>{`
                .infinity-path {
                    stroke-dasharray: 350;
                    stroke-dashoffset: 350;
                    animation: dash 3s linear infinite;
                }
                
                @keyframes dash {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                
                @keyframes pulseText {
                    0%, 100% { 
                        opacity: 0.8; 
                        text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
                    }
                    50% { 
                        opacity: 1; 
                        text-shadow: 0 0 25px rgba(187, 44, 0, 0.9), 0 0 50px rgba(255, 255, 255, 0.6);
                        transform: scale(1.02);
                    }
                }
            `}</style>
        </div>
    );
};
