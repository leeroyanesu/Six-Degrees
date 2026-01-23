import React, { useState } from 'react';
import './WonderousRelationshipPopup.css';

export const WonderousRelationshipPopup = ({ onComplete }) => {
    const [step, setStep] = useState('intro');
    const [answers, setAnswers] = useState({
        relationshipWith: '',
        improvement: '',
        action: ''
    });
    const [showReward, setShowReward] = useState(false);

    const handleAnswer = (question, value) => {
        setAnswers(prev => ({
            ...prev,
            [question]: value
        }));
    };

    const handleNext = () => {
        if (step === 'intro') {
            setStep('questions');
        }
    };

    const handleSubmit = () => {
        if (answers.relationshipWith && answers.improvement && answers.action) {
            setShowReward(true);
        } else {
            alert("Please choose one option for each question so we can save your plan.");
        }
    };

    const handleFinish = () => {
        // Create My Actions entry
        const actionEntry = {
            type: 'Something Bigger – Wondrous relationship step',
            action: getActionText(answers.action)
        };
        onComplete(actionEntry);
    };

    const getActionText = (actionValue) => {
        const actions = {
            conversation: 'Invite them for a focused conversation about something that matters to both of us.',
            appreciate: 'Tell them one thing I deeply appreciate about them.',
            support: 'Ask them what support they need from me right now.',
            other: 'Something else'
        };
        return actions[actionValue] || actionValue;
    };

    if (!onComplete) return null;

    return (
        <div className="wondrous-overlay">
            <div className="wondrous-popup">
                {step === 'intro' && (
                    <>
                        <h2 className="wondrous-title">Wondrous Relationship</h2>
                        
                        <p className="wondrous-intro">
                            Now we'll look at one relationship you would like to make more 'wondrous'.
                        </p>
                        
                        <p className="wondrous-intro">
                            'Wondrous' can mean warmer, braver, more honest, or more fun.
                        </p>
                        
                        <p className="wondrous-intro highlight">
                            Choose one relationship and one small action you're willing to take to help it grow.
                        </p>

                        <div className="imagine-prompt">
                            <p>Imagine a relationship you want to make more "wondrous".</p>
                        </div>

                        <button onClick={handleNext} className="wondrous-button">
                            BEGIN
                        </button>
                    </>
                )}

                {step === 'questions' && !showReward && (
                    <>
                        <h2 className="wondrous-title">Make It Wondrous</h2>
                        
                        {/* Question 1 */}
                        <div className="wondrous-question">
                            <h3 className="question-title">Who is this relationship with (no names needed)?</h3>
                            
                            <div className="radio-options">
                                <label className={`radio-option ${answers.relationshipWith === 'family' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="relationshipWith"
                                        value="family"
                                        checked={answers.relationshipWith === 'family'}
                                        onChange={(e) => handleAnswer('relationshipWith', e.target.value)}
                                    />
                                    <span>Family</span>
                                </label>

                                <label className={`radio-option ${answers.relationshipWith === 'friend' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="relationshipWith"
                                        value="friend"
                                        checked={answers.relationshipWith === 'friend'}
                                        onChange={(e) => handleAnswer('relationshipWith', e.target.value)}
                                    />
                                    <span>Friend</span>
                                </label>

                                <label className={`radio-option ${answers.relationshipWith === 'colleague' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="relationshipWith"
                                        value="colleague"
                                        checked={answers.relationshipWith === 'colleague'}
                                        onChange={(e) => handleAnswer('relationshipWith', e.target.value)}
                                    />
                                    <span>Colleague / co-creator</span>
                                </label>

                                <label className={`radio-option ${answers.relationshipWith === 'community' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="relationshipWith"
                                        value="community"
                                        checked={answers.relationshipWith === 'community'}
                                        onChange={(e) => handleAnswer('relationshipWith', e.target.value)}
                                    />
                                    <span>Someone in my community</span>
                                </label>

                                <label className={`radio-option ${answers.relationshipWith === 'other' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="relationshipWith"
                                        value="other"
                                        checked={answers.relationshipWith === 'other'}
                                        onChange={(e) => handleAnswer('relationshipWith', e.target.value)}
                                    />
                                    <span>Someone else</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 2 */}
                        <div className="wondrous-question">
                            <h3 className="question-title">If this relationship becomes more 'wondrous', what would change the most?</h3>
                            
                            <div className="radio-options">
                                <label className={`radio-option ${answers.improvement === 'communication' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="improvement"
                                        value="communication"
                                        checked={answers.improvement === 'communication'}
                                        onChange={(e) => handleAnswer('improvement', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">The way we communicate</div>
                                        <div className="option-description">
                                            How we talk and listen to each other.
                                        </div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.improvement === 'safety' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="improvement"
                                        value="safety"
                                        checked={answers.improvement === 'safety'}
                                        onChange={(e) => handleAnswer('improvement', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">How safe we feel with each other</div>
                                        <div className="option-description">
                                            How honest we can be and how much we can be ourselves.
                                        </div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.improvement === 'action' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="improvement"
                                        value="action"
                                        checked={answers.improvement === 'action'}
                                        onChange={(e) => handleAnswer('improvement', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">How we take action together</div>
                                        <div className="option-description">
                                            How we do things together, help others, or work on shared goals.
                                        </div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.improvement === 'celebration' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="improvement"
                                        value="celebration"
                                        checked={answers.improvement === 'celebration'}
                                        onChange={(e) => handleAnswer('improvement', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">How we celebrate each other</div>
                                        <div className="option-description">
                                            How we notice, thank, and cheer each other on.
                                        </div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.improvement === 'other' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="improvement"
                                        value="other"
                                        checked={answers.improvement === 'other'}
                                        onChange={(e) => handleAnswer('improvement', e.target.value)}
                                    />
                                    <span>Something else</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 3 */}
                        <div className="wondrous-question">
                            <h3 className="question-title">Choose one small action you are willing to try with this person in real life:</h3>
                            
                            <div className="radio-options">
                                <label className={`radio-option ${answers.action === 'conversation' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="action"
                                        value="conversation"
                                        checked={answers.action === 'conversation'}
                                        onChange={(e) => handleAnswer('action', e.target.value)}
                                    />
                                    <span>Invite them for a focused conversation about something that matters to both of us.</span>
                                </label>

                                <label className={`radio-option ${answers.action === 'appreciate' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="action"
                                        value="appreciate"
                                        checked={answers.action === 'appreciate'}
                                        onChange={(e) => handleAnswer('action', e.target.value)}
                                    />
                                    <span>Tell them one thing I deeply appreciate about them.</span>
                                </label>

                                <label className={`radio-option ${answers.action === 'support' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="action"
                                        value="support"
                                        checked={answers.action === 'support'}
                                        onChange={(e) => handleAnswer('action', e.target.value)}
                                    />
                                    <span>Ask them what support they need from me right now.</span>
                                </label>

                                <label className={`radio-option ${answers.action === 'other' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="action"
                                        value="other"
                                        checked={answers.action === 'other'}
                                        onChange={(e) => handleAnswer('action', e.target.value)}
                                    />
                                    <span>Something else</span>
                                </label>
                            </div>
                        </div>

                        <button 
                            onClick={handleSubmit} 
                            className="wondrous-button"
                            disabled={!answers.relationshipWith || !answers.improvement || !answers.action}
                        >
                            SAVE AND CONTINUE
                        </button>
                    </>
                )}

                {showReward && (
                    <>
                        <h2 className="wondrous-title reward-title">✨ Well Done!</h2>
                        
                        <p className="feedback-message">
                            You've chosen one small way to make this relationship more wondrous.
                            Even a tiny action can help a connection grow.
                        </p>

                        <div className="reward-section">
                            <h3 className="reward-header">Impact Rewards</h3>
                            
                            <div className="action-saved">
                                <div className="action-icon">📝</div>
                                <h4 className="action-name">My Actions Entry Created</h4>
                                <p className="action-type">Something Bigger – Wondrous relationship step</p>
                                <p className="action-description">
                                    {getActionText(answers.action)}
                                </p>
                            </div>
                        </div>

                        <button onClick={handleFinish} className="wondrous-button reward-button">
                            CONTINUE JOURNEY
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
