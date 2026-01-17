import React, { useState } from 'react';
import './SomethingBiggerPopup.css';

export const NurtureExercisePopup = ({ isOpen, onClose, onContinue }) => {
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  if (!isOpen) return null;

  const handleContinue = () => {
    // Save answers or process them as needed
    console.log('Answer 1:', answer1);
    console.log('Answer 2:', answer2);
    onContinue();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container exercise-popup">
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        
        <div className="popup-content">
          <div className="popup-header">
            <div className="logo-container">
              <div className="logo-icon">
                <div className="logo-circle"></div>
              </div>
              <span className="logo-text">SOMETHING BIGGER</span>
            </div>
          </div>

          <div className="popup-body">
            <div className="exercise-header">
              <span className="degree-label">1ST DEGREE OF CONNECTION EXERCISE</span>
              <h1 className="exercise-title">
                Nurture Something Bigger
              </h1>
            </div>

            <div className="exercise-instruction">
              <p>
                Write the name of someone with whom you have a partnership that's created Something 
                Bigger than the two of you could have accomplished on your own.
              </p>
              <div className="circle-diagram">
                <div className="empty-circle">
                  <svg width="150" height="150" viewBox="0 0 150 150">
                    <circle cx="75" cy="75" r="70" fill="none" stroke="#2196F3" strokeWidth="2" />
                    <path d="M 75 5 L 85 25 L 65 25 Z" fill="#2196F3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="exercise-questions">
              <div className="question-block">
                <label className="question-number">1.</label>
                <div className="question-content">
                  <p className="question-text">
                    What <span className="highlight-text">quality of this partnership</span> has 
                    allowed it to create an extraordinary impact?
                  </p>
                  <textarea
                    className="answer-input"
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="question-block">
                <label className="question-number">2.</label>
                <div className="question-content">
                  <p className="question-text">
                    What has this partnership <span className="highlight-text">made uniquely possible 
                    in this world</span> that can only exist with you in partnership with this person?
                  </p>
                  <textarea
                    className="answer-input"
                    value={answer2}
                    onChange={(e) => setAnswer2(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <button className="explore-button" onClick={handleContinue}>
              Continue Exploring
            </button>
          </div>

          <div className="popup-footer">
            <span>EXPLORER TOOLKIT</span>
            <span>SOMETHING BIGGER</span>
          </div>
        </div>
      </div>
    </div>
  );
};
