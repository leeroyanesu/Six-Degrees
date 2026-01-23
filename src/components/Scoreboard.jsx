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
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            background: 'rgba(0, 0, 0, 0.7)',
            border: '4px solid #FFD700',
            borderRadius: '15px',
            color: 'white',
            fontFamily: '"Press Start 2P", cursive, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 0 10px #FFD700, inset 0 0 20px rgba(255, 215, 0, 0.2)',
            zIndex: 1000
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    fontSize: '12px',
                    color: '#aaa',
                    marginBottom: '5px',
                    textTransform: 'uppercase'
                }}>
                    Badges
                </div>
                <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#FFD700',
                    textShadow: '2px 2px 0px #000'
                }}>
                    {badgeCount}
                </div>
            </div>

            <div style={{
                width: '2px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.3)'
            }} />

            {/* Badge Icons */}
            <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                maxWidth: '200px'
            }}>
                {badgeIcons.slice(0, 6).map((iconUrl, i) => (
                    <div key={i} style={{
                        width: '36px',
                        height: '36px',
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
                                    width: '28px',
                                    height: '28px',
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
                                fontSize: '18px',
                                color: 'rgba(255, 255, 255, 0.3)'
                            }}>
                                ?
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
