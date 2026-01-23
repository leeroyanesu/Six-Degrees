import React, { useState } from 'react';
import './KeepPracticePopup.css';

export const KeepPracticePopup = ({ onComplete }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showReward, setShowReward] = useState(false);

  const options = [
    { id: 'talk', label: 'Talk to someone this month about one of my dreams.' },
    { id: 'observe', label: 'Pay attention to where partnerships are making something bigger happen at work/school.' },
    { id: 'appreciate', label: 'Notice and appreciate when someone supports my purpose.' },
    { id: 'open', label: "I don't know yet, I just want to stay open to possibilities." }
  ];

  const handleConfirm = () => {
    if (!selectedOption) {
      alert("Please select one option before continuing.");
      return;
    }
    setShowReward(true);
  };

  const handleFinish = () => {
    onComplete();
  };

  if (!onComplete) return null;

  return (
    <div className="keep-practice-overlay">
      <div className="keep-practice-popup">
        {!showReward ? (
          <>
            <h2 className="keep-practice-title">Choose a way to keep Something Bigger alive</h2>
            
            <p className="keep-practice-intro">
              You've thought about partnerships and dreams. Choose one simple way you'd like to 
              keep this Degree alive in your life.
            </p>

            <div className="option-list">
              {options.map((option) => (
                <label 
                  key={option.id} 
                  className={`practice-option ${selectedOption === option.id ? 'selected' : ''}`}
                >
                  <input 
                    type="radio"
                    name="practice"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="practice-radio"
                  />
                  <span className="practice-label">{option.label}</span>
                </label>
              ))}
            </div>

            <button 
              onClick={handleConfirm} 
              className="keep-practice-button"
              disabled={!selectedOption}
            >
              CONFIRM
            </button>
          </>
        ) : (
          <>
            <h2 className="keep-practice-title reward-title">✨ Impact Rewards</h2>
            
            <p className="feedback-message">
              You've chosen a way to keep Something Bigger alive in your life. This simple practice 
              will help you notice and nurture the connections that create extraordinary impact.
            </p>

            <div className="reward-section">
              <div className="reward-card">
                <div className="card-icon">🌟</div>
                <h4 className="card-name">Keeping Something Bigger Alive</h4>
                <p className="card-description">
                  Something Bigger happens when people connect their purposes and support each other. 
                  This First Degree of Connection is about partnerships—where two people create more 
                  together than they could alone. By noticing these partnerships in your life, nurturing 
                  them, and taking small actions to make them more wondrous, you keep Something Bigger alive.
                </p>
                <div className="card-practice">
                  <strong>Your chosen practice:</strong>
                  <p>{options.find(o => o.id === selectedOption)?.label}</p>
                </div>
              </div>
            </div>

            <button onClick={handleFinish} className="keep-practice-button reward-button">
              CONTINUE JOURNEY
            </button>
          </>
        )}
      </div>
    </div>
  );
};
