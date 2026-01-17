import React, { useState } from 'react';
import './SomethingBiggerPopup.css';

export const KeepPracticePopup = ({ isOpen, onClose, onContinue }) => {
  const [dream, setDream] = useState('');

  if (!isOpen) return null;

  const handleContinue = () => {
    console.log('Dream answer:', dream);
    onContinue();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container practice-popup">
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        
        <div className="popup-content">
          <div className="practice-header">
            <div className="header-wave">
              <div className="logo-container">
                <div className="logo-icon">
                  <div className="logo-circle"></div>
                </div>
                <h1 className="practice-title">Keep up the practice</h1>
              </div>
            </div>
          </div>

          <div className="popup-body">
            <div className="practice-instruction">
              <p>
                Start dreamscribing with your Deep Connections. Write down 50 dreams 
                in five minutes and see where Something Bigger can take you.
              </p>
            </div>

            <div className="numbers-display">
              <span className="number number-1">1</span>
              <span className="number number-10">10</span>
              <span className="number number-20">20</span>
              <span className="number number-30">30</span>
              <span className="number number-40">40</span>
              <span className="number number-50">50</span>
            </div>

            <div className="dream-question">
              <p className="dream-prompt">
                What is one dream worth pursuing with a Deep Connection? Share your 
                wonderings on social using the hashtags <span className="hashtag">#PartneringTheBook</span>{' '}
                <span className="hashtag">#PlusWonder</span>
              </p>
              <textarea
                className="dream-input"
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="Write your dream here..."
                rows={3}
              />
            </div>

            <button className="explore-button" onClick={handleContinue}>
              Finish Journey
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
