import React from 'react';

export const Scoreboard = ({ badgeCount = 0 }) => {
    // Badge icons from Icons8
    const badgeIcons = [
        'https://img.icons8.com/fluency/48/connection-card.png', // Something Bigger - Key Idea
        'https://img.icons8.com/fluency/48/spotlight.png', // Partnership Spotlight
        'https://img.icons8.com/fluency/48/dreams.png', // Degree 1 ACT (Dreamscribing)
        'https://img.icons8.com/fluency/48/infinity.png', // Keeping Something Bigger Alive
        'https://img.icons8.com/fluency/48/sparkling.png', // Future badges
    ];

    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '10px 15px',
            background: 'rgba(0, 0, 0, 0.7)',
            border: '3px solid #FFD700',
            borderRadius: '10px',
            color: 'white',
            fontFamily: '"Press Start 2P", cursive, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 0 10px #FFD700, inset 0 0 20px rgba(255, 215, 0, 0.2)',
            zIndex: 1000,
            flexWrap: 'wrap'
        }}>
            <style>{
                `@media (max-width: 768px) {
                    .scoreboard-container {
                        top: 5px !important;
                        right: 5px !important;
                        padding: 8px 12px !important;
                        gap: 8px !important;
                    }
                    .scoreboard-text {
                        font-size: 8px !important;
                    }
                    .scoreboard-count {
                        font-size: 16px !important;
                    }
                    .scoreboard-divider {
                        display: none !important;
                    }
                    .scoreboard-badges {
                        gap: 6px !important;
                        max-width: 150px !important;
                    }
                    .scoreboard-badge {
                        width: 24px !important;
                        height: 24px !important;
                    }
                    .scoreboard-badge img {
                        width: 18px !important;
                        height: 18px !important;
                    }
                    .scoreboard-badge span {
                        font-size: 14px !important;
                    }
                }`
            }</style>
            <div className="scoreboard-container" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div className="scoreboard-text" style={{
                        fontSize: '10px',
                        color: '#aaa',
                        marginBottom: '5px',
                        textTransform: 'uppercase'
                    }}>
                        Badges
                    </div>
                    <div className="scoreboard-count" style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#FFD700',
                        textShadow: '2px 2px 0px #000'
                    }}>
                        {badgeCount}
                    </div>
                </div>

                <div className="scoreboard-divider" style={{
                    width: '2px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.3)'
                }} />

                {/* Badge Icons */}
                <div className="scoreboard-badges" style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    maxWidth: '200px'
                }}>
                {badgeIcons.slice(0, 6).map((iconUrl, i) => (
                    <div key={i} className="scoreboard-badge" style={{
                        width: '32px',
                        height: '32px',
                        background: i < badgeCount ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${i < badgeCount ? '#FFD700' : 'rgba(255, 255, 255, 0.2)'}`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: i < badgeCount ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {i < badgeCount ? (
                            <img 
                                src={iconUrl} 
                                alt={`Badge ${i + 1}`}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    objectFit: 'contain'
                                }}
                                onError={(e) => {
                                    if (e.target && e.target.parentElement) {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = '⭐';
                                        e.target.parentElement.style.fontSize = '20px';
                                    }
                                }}
                            />
                        ) : (
                            <span style={{
                                fontSize: '16px',
                                color: 'rgba(255, 255, 255, 0.3)'
                            }}>
                                ?
                            </span>
                        )}
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};
