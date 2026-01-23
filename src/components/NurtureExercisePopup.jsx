import React, { useState } from 'react';
import './NurtureExercisePopup.css';

export const NurtureExercisePopup = ({ onComplete }) => {
    const [step, setStep] = useState('intro');
    const [answers, setAnswers] = useState({
        person: '',
        creation: '',
        quality: ''
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
        if (answers.person && answers.creation && answers.quality) {
            setShowReward(true);
        } else {
            alert("Please answer all questions before submitting.");
        }
    };

    const handleFinish = () => {
        onComplete();
    };

    if (!onComplete) return null;

    return (
        <div className="nurture-overlay">
            <div className="nurture-popup">
                {step === 'intro' && (
                    <>
                        <h2 className="nurture-title">Nurture Something Bigger</h2>
                        
                        <p className="nurture-intro">
                            In this step, you'll think about someone in your life who has already helped you 
                            create Something Bigger. Together, you made more than you could have made on your 
                            own. Let's explore who that person is and what your connection created.
                        </p>

                        <button onClick={handleNext} className="nurture-button">
                            BEGIN REFLECTION
                        </button>
                    </>
                )}

                {step === 'questions' && !showReward && (
                    <>
                        <h2 className="nurture-title">Your Partnership Story</h2>
                        
                        {/* Question 1 */}
                        <div className="nurture-question">
                            <h3 className="question-title">Who is one person you've created Something Bigger with?</h3>
                            
                            <div className="radio-options">
                                <label className={`radio-option ${answers.person === 'family' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="person"
                                        value="family"
                                        checked={answers.person === 'family'}
                                        onChange={(e) => handleAnswer('person', e.target.value)}
                                    />
                                    <span>Family</span>
                                </label>

                                <label className={`radio-option ${answers.person === 'friend' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="person"
                                        value="friend"
                                        checked={answers.person === 'friend'}
                                        onChange={(e) => handleAnswer('person', e.target.value)}
                                    />
                                    <span>Friend</span>
                                </label>

                                <label className={`radio-option ${answers.person === 'teammate' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="person"
                                        value="teammate"
                                        checked={answers.person === 'teammate'}
                                        onChange={(e) => handleAnswer('person', e.target.value)}
                                    />
                                    <span>Teammate / classmate</span>
                                </label>

                                <label className={`radio-option ${answers.person === 'community' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="person"
                                        value="community"
                                        checked={answers.person === 'community'}
                                        onChange={(e) => handleAnswer('person', e.target.value)}
                                    />
                                    <span>Someone in my community</span>
                                </label>

                                <label className={`radio-option ${answers.person === 'other' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="person"
                                        value="other"
                                        checked={answers.person === 'other'}
                                        onChange={(e) => handleAnswer('person', e.target.value)}
                                    />
                                    <span>Someone else</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 2 */}
                        <div className="nurture-question">
                            <h3 className="question-title">What best describes what you created together?</h3>
                            
                            <div className="radio-options">
                                <label className={`radio-option ${answers.creation === 'project' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="creation"
                                        value="project"
                                        checked={answers.creation === 'project'}
                                        onChange={(e) => handleAnswer('creation', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">A project</div>
                                        <div className="option-description">
                                            For example: a club, an event, a piece of art, a fundraiser, or a shared idea.
                                        </div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.creation === 'movement' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="creation"
                                        value="movement"
                                        checked={answers.creation === 'movement'}
                                        onChange={(e) => handleAnswer('creation', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">A movement or campaign</div>
                                        <div className="option-description">
                                            Something that reached lots of people or tried to change something bigger.
                                        </div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.creation === 'space' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="creation"
                                        value="space"
                                        checked={answers.creation === 'space'}
                                        onChange={(e) => handleAnswer('creation', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">A family or community space</div>
                                        <div className="option-description">
                                            For example: a home, a youth group, a team, or another place that feels safe.
                                        </div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.creation === 'other' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="creation"
                                        value="other"
                                        checked={answers.creation === 'other'}
                                        onChange={(e) => handleAnswer('creation', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">Something else</div>
                                        <div className="option-description">
                                            Something important that doesn't fit into the other options.
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Question 3 */}
                        <div className="nurture-question">
                            <h3 className="question-title">Which quality most helped this connection become Something Bigger?</h3>
                            
                            <div className="radio-options">
                                <label className={`radio-option ${answers.quality === 'trust' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="quality"
                                        value="trust"
                                        checked={answers.quality === 'trust'}
                                        onChange={(e) => handleAnswer('quality', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">Trust</div>
                                        <div className="option-description">You could count on each other.</div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.quality === 'purpose' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="quality"
                                        value="purpose"
                                        checked={answers.quality === 'purpose'}
                                        onChange={(e) => handleAnswer('quality', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">Shared purpose</div>
                                        <div className="option-description">You cared about the same bigger goal.</div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.quality === 'skills' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="quality"
                                        value="skills"
                                        checked={answers.quality === 'skills'}
                                        onChange={(e) => handleAnswer('quality', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">Complementary skills</div>
                                        <div className="option-description">
                                            You were good at different things that worked well together.
                                        </div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.quality === 'commitment' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="quality"
                                        value="commitment"
                                        checked={answers.quality === 'commitment'}
                                        onChange={(e) => handleAnswer('quality', e.target.value)}
                                    />
                                    <div>
                                        <div className="option-main">Commitment over time</div>
                                        <div className="option-description">You kept showing up for each other.</div>
                                    </div>
                                </label>

                                <label className={`radio-option ${answers.quality === 'other' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio"
                                        name="quality"
                                        value="other"
                                        checked={answers.quality === 'other'}
                                        onChange={(e) => handleAnswer('quality', e.target.value)}
                                    />
                                    <span>Something else</span>
                                </label>
                            </div>
                        </div>

                        <button 
                            onClick={handleSubmit} 
                            className="nurture-button"
                            disabled={!answers.person || !answers.creation || !answers.quality}
                        >
                            SUBMIT REFLECTION
                        </button>
                    </>
                )}

                {showReward && (
                    <>
                        <h2 className="nurture-title reward-title">✨ Well Done!</h2>
                        
                        <p className="feedback-message">
                            You've just spotted a connection in your life that already creates Something Bigger.
                            Not everyone notices this. Well done for seeing it!
                        </p>

                        <div className="reward-section">
                            <h3 className="reward-header">Impact Rewards</h3>
                            
                            <div className="reward-card">
                                <div className="badge-icon">🏅</div>
                                <h4 className="badge-name">Partnership Spotlight</h4>
                                <p className="badge-description">
                                    Some of your relationships are already creating Something Bigger. When you 
                                    notice and appreciate them, you can protect them, grow them, and let them 
                                    guide what you do next.
                                </p>
                            </div>
                        </div>

                        <button onClick={handleFinish} className="nurture-button reward-button">
                            CONTINUE JOURNEY
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
