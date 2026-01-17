import React, { useState } from 'react';
import './SomethingBiggerPopup.css';

export const WonderousRelationshipPopup = ({ isOpen, onClose, onContinue }) => {
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  if (!isOpen) return null;

  const handleContinue = () => {
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
                Wonderous Relationship
              </h1>
            </div>

            <div className="exercise-instruction">
              <p>
                Write the name of someone in your life that you would like to nurture into a 
                wonderous relationship.
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
                <div className="question-content">
                  <p className="question-text">
                    <span className="highlight-text">Vividly imagine</span> what this partnership might be like.
                  </p>
                  <p className="question-subtext">
                    What's the quality that would allow this partnership to become Something Bigger 
                    than the two of you alone? Describe it here.
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
                <div className="question-content">
                  <p className="question-text">
                    Write down the <span className="highlight-text">next thing you can do</span> to 
                    form this partnership and what you'll say to get it going.
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
