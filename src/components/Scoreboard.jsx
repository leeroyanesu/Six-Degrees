import React from 'react';

export const Scoreboard = ({ badgeCount = 0 }) => {
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
                    Score
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

            {/* Icons Placeholder */}
            <div style={{
                display: 'flex',
                gap: '10px'
            }}>
                {[0, 1].map((i) => (
                    <div key={i} style={{
                        width: '30px',
                        height: '30px',
                        background: i < badgeCount ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: i < badgeCount ? '#000' : '#fff',
                        boxShadow: i < badgeCount ? '0 0 10px #FFD700' : 'none'
                    }}>
                        {i < badgeCount ? '★' : '?'}
                    </div>
                ))}
            </div>
        </div>
    );
};
