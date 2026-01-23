import React, { useState } from 'react';
import './DreamscribingPopup.css';

export const DreamscribingPopup = ({ onComplete }) => {
    const [step, setStep] = useState('intro');
    const [selectedDreams, setSelectedDreams] = useState(new Set());
    const [customDreamText, setCustomDreamText] = useState('');
    const [dreamCategory, setDreamCategory] = useState('');
    const [showReward, setShowReward] = useState(false);

    const dreamPrompts = [
        { id: 'community', label: 'Work on a project with someone that improves my local community.' },
        { id: 'oceans', label: 'Create something for the oceans or rivers.' },
        { id: 'kinder', label: 'Help make my school, workplace or neighbourhood kinder.' },
        { id: 'group', label: 'Join or start a group around a cause that matters to me.' },
        { id: 'custom', label: 'I have another idea in mind already.' }
    ];

    const categories = [
        'Tree of Life',
        'Waves of Impact',
        'Winds of Change',
        'City Sparks',
        'Youth Constellations',
        'Not sure'
    ];

    const handleDreamToggle = (dreamId) => {
        const newSelected = new Set(selectedDreams);
        if (newSelected.has(dreamId)) {
            newSelected.delete(dreamId);
            // Clear custom text if unchecking custom option
            if (dreamId === 'custom') {
                setCustomDreamText('');
            }
        } else {
            newSelected.add(dreamId);
        }
        setSelectedDreams(newSelected);
    };

    const handleNext = () => {
        if (step === 'intro') {
            setStep('dreams');
        }
    };

    const handleAddDream = () => {
        if (selectedDreams.size === 0) {
            alert("Please select at least one dream before continuing.");
            return;
        }

        // If custom is selected but no text provided, that's okay (text is optional)
        setShowReward(true);
    };

    const handleFinish = () => {
        // Create My Actions entries
        const actions = [];
        
        selectedDreams.forEach(dreamId => {
            const dream = dreamPrompts.find(d => d.id === dreamId);
            const action = {
                type: 'Dream',
                label: dreamId === 'custom' ? 'Dream: custom idea' : `Dream: ${dreamId}`,
                description: dreamId === 'custom' && customDreamText ? customDreamText : dream.label,
                category: dreamCategory || 'Not specified',
                customText: dreamId === 'custom' ? customDreamText : null
            };
            actions.push(action);
        });

        onComplete(actions);
    };

    if (!onComplete) return null;

    return (
        <div className="dreamscribing-overlay">
            <div className="dreamscribing-popup">
                {step === 'intro' && (
                    <>
                        <h2 className="dreamscribing-title">Dreamscribing</h2>
                        
                        <div className="dreamscribing-intro">
                            <p>
                                <strong>Dreamscribing</strong> is the practice of writing down many dreams and ideas 
                                without judging them first.
                            </p>
                            <p>
                                When you write down your dreams, you give them space to exist. You don't have to 
                                know how to make them happen yet—you just need to notice them and honor them.
                            </p>
                            <p>
                                The more dreams you write, the clearer your path becomes. Some dreams connect to 
                                each other. Some inspire action. Some just need to be seen.
                            </p>
                            <p className="highlight-text">
                                Let's dreamscribe together. Choose the dreams that call to you.
                            </p>
                        </div>

                        <button onClick={handleNext} className="dreamscribing-button">
                            BEGIN DREAMSCRIBING
                        </button>
                    </>
                )}

                {step === 'dreams' && !showReward && (
                    <>
                        <h2 className="dreamscribing-title">Choose Your Dreams</h2>
                        
                        <p className="instruction-text">
                            Select at least one dream you want to bring into the world. You can choose as many as you like.
                        </p>

                        <div className="dream-options">
                            {dreamPrompts.map((dream) => (
                                <label 
                                    key={dream.id} 
                                    className={`dream-option ${selectedDreams.has(dream.id) ? 'selected' : ''}`}
                                >
                                    <input 
                                        type="checkbox"
                                        checked={selectedDreams.has(dream.id)}
                                        onChange={() => handleDreamToggle(dream.id)}
                                        className="dream-checkbox"
                                    />
                                    <span className="dream-label">{dream.label}</span>
                                </label>
                            ))}
                        </div>

                        {selectedDreams.has('custom') && (
                            <div className="custom-dream-section">
                                <label className="custom-dream-label">
                                    Write 1 line about your idea (optional):
                                </label>
                                <input 
                                    type="text"
                                    value={customDreamText}
                                    onChange={(e) => setCustomDreamText(e.target.value)}
                                    placeholder="Describe your dream in one line..."
                                    className="custom-dream-input"
                                    maxLength={100}
                                />
                            </div>
                        )}

                        {selectedDreams.size > 0 && (
                            <div className="category-section">
                                <label className="category-label">
                                    Does this dream relate to… (optional)
                                </label>
                                <select 
                                    value={dreamCategory}
                                    onChange={(e) => setDreamCategory(e.target.value)}
                                    className="category-dropdown"
                                >
                                    <option value="">Choose a connection...</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button 
                            onClick={handleAddDream} 
                            className="dreamscribing-button"
                            disabled={selectedDreams.size === 0}
                        >
                            ADD DREAM AS ACTION
                        </button>
                    </>
                )}

                {showReward && (
                    <>
                        <h2 className="dreamscribing-title reward-title">✨ Dreams Recorded!</h2>
                        
                        <p className="feedback-message">
                            You've honored your dreams by writing them down. These dreams are now part of your journey, 
                            stored in your actions and ready to guide your next steps.
                        </p>

                        <div className="reward-section">
                            <h3 className="reward-header">Impact Rewards</h3>
                            
                            <div className="reward-card">
                                <div className="badge-icon">🌟</div>
                                <h4 className="badge-name">Degree 1 ACT Badge</h4>
                                <p className="badge-description">
                                    You've taken the first step in the ACT practice. By dreamscribing, you've given 
                                    your aspirations a voice and created a foundation for meaningful action. Your dreams 
                                    are no longer just thoughts—they're commitments waiting to unfold.
                                </p>
                            </div>

                            <div className="actions-created">
                                <h4 className="actions-title">My Actions Created:</h4>
                                <ul className="actions-list">
                                    {Array.from(selectedDreams).map(dreamId => {
                                        const dream = dreamPrompts.find(d => d.id === dreamId);
                                        return (
                                            <li key={dreamId} className="action-item">
                                                {dreamId === 'custom' ? '✨ Custom Dream' : `💫 ${dream.label}`}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        <button onClick={handleFinish} className="dreamscribing-button reward-button">
                            CONTINUE JOURNEY
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
