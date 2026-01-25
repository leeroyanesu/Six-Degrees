import React from 'react';
import './NewIslandPopup.css';

export const NewIslandPopup = ({ onClose }) => {
    if (!onClose) return null;

    return (
        <div className="new-island-overlay">
            <div className="new-island-popup">
                <div className="island-animation">
                    <div className="island-glow"></div>
                    <div className="island-icon">🏝️</div>
                </div>
                
                <h1 className="island-title">New Island Discovered!</h1>
                
                <p className="island-message">
                    Your connections have drawn a new island closer! The Second Degree of Connection 
                    awaits, where you'll discover how partnerships can grow into teams and communities, 
                    amplifying your impact even further.
                </p>

                <div className="island-details">
                    <div className="detail-item">
                        <div className="detail-icon">🌟</div>
                        <div className="detail-text">
                            <strong>First Degree Complete</strong>
                            <span>Partnerships mastered</span>
                        </div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-icon">🌉</div>
                        <div className="detail-text">
                            <strong>Bridge Formed</strong>
                            <span>New connections unlocked</span>
                        </div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-icon">✨</div>
                        <div className="detail-text">
                            <strong>Next Adventure</strong>
                            <span>Second Degree accessible</span>
                        </div>
                    </div>
                </div>


                <button onClick={onClose} className="island-button">
                    EXPLORE THE ISLAND
                </button>
            </div>
        </div>
    );
};
