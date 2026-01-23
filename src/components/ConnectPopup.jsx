import React, { useState } from 'react';
import './ConnectPopup.css';

export const ConnectPopup = ({ onComplete }) => {
    const [reflection, setReflection] = useState('');
    const [trackActions, setTrackActions] = useState('');
    const [showReward, setShowReward] = useState(false);

    const handleComplete = () => {
        if (!trackActions) {
            alert("Please choose whether you want to track your actions.");
            return;
        }
        setShowReward(true);
    };

    const handleFinish = () => {
        onComplete({
            reflection: reflection.trim(),
            trackActions: trackActions === 'yes'
        });
    };

    if (!onComplete) return null;

    return (
        <div className="connect-overlay">
            <div className="connect-popup">
                {!showReward ? (
                    <>
                        <h2 className="connect-title">Reflect & Connect</h2>
                        
                        <div className="reflection-section">
                            <label className="reflection-label">
                                One thing I want to remember about Something Bigger is…
                            </label>
                            <textarea
                                value={reflection}
                                onChange={(e) => setReflection(e.target.value)}
                                placeholder="Share your reflection (optional)..."
                                className="reflection-input"
                                rows={4}
                                maxLength={300}
                            />
                            <div className="character-count">
                                {reflection.length}/300 characters
                            </div>
                        </div>

                        <div className="tracking-section">
                            <p className="tracking-question">
                                Do you want to track this Degree's action in your 'My Actions' list so you 
                                can mark it completed later?
                            </p>
                            
                            <div className="tracking-options">
                                <label className={`tracking-option ${trackActions === 'yes' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="tracking"
                                        value="yes"
                                        checked={trackActions === 'yes'}
                                        onChange={(e) => setTrackActions(e.target.value)}
                                        className="tracking-radio"
                                    />
                                    <span>Yes</span>
                                </label>

                                <label className={`tracking-option ${trackActions === 'no' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="tracking"
                                        value="no"
                                        checked={trackActions === 'no'}
                                        onChange={(e) => setTrackActions(e.target.value)}
                                        className="tracking-radio"
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>

                        <button 
                            onClick={handleComplete} 
                            className="connect-button"
                            disabled={!trackActions}
                        >
                            COMPLETE DEGREE 1 →
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="connect-title reward-title">🎉 Impact Rewards</h2>
                        
                        <p className="completion-message">
                            Congratulations! You've completed the First Degree of Connection. You now understand 
                            how Something Bigger happens through partnerships, and you have the tools to nurture 
                            and grow these connections in your life.
                        </p>

                        <div className="reward-section">
                            <div className="big-badge-card">
                                <div className="badge-glow">
                                    <div className="badge-icon-large">⭐</div>
                                </div>
                                <h3 className="badge-name-large">Something Bigger Explorer</h3>
                                <p className="badge-description-large">
                                    You've journeyed through the First Degree of Connection, discovering how partnerships 
                                    create Something Bigger. You've reflected on your connections, nurtured relationships, 
                                    dreamed about possibilities, and committed to keeping this practice alive. You are now 
                                    a Something Bigger Explorer.
                                </p>
                            </div>

                            <div className="progress-ring-section">
                                <h4 className="progress-title">Explorer Progress</h4>
                                <div className="progress-ring-container">
                                    <svg className="progress-ring" width="120" height="120">
                                        <circle
                                            className="progress-ring-bg"
                                            cx="60"
                                            cy="60"
                                            r="50"
                                        />
                                        <circle
                                            className="progress-ring-fill degree-1-complete"
                                            cx="60"
                                            cy="60"
                                            r="50"
                                        />
                                    </svg>
                                    <div className="progress-label">
                                        <div className="progress-degree">Degree 1</div>
                                        <div className="progress-status">Complete!</div>
                                    </div>
                                </div>
                                <p className="progress-note">
                                    You've completed 1 of 6 Degrees of Connection
                                </p>
                            </div>

                            {reflection && (
                                <div className="reflection-saved">
                                    <h4 className="saved-title">Your Reflection</h4>
                                    <p className="saved-text">"{reflection}"</p>
                                </div>
                            )}

                            {trackActions === 'yes' && (
                                <div className="tracking-confirmed">
                                    <div className="tracking-icon">✓</div>
                                    <p>Your actions are being tracked in My Actions</p>
                                </div>
                            )}
                        </div>

                        <button onClick={handleFinish} className="connect-button reward-button">
                            CONTINUE JOURNEY
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
