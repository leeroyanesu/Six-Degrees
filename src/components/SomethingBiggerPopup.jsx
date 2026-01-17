import React from 'react';
import './SomethingBiggerPopup.css';

export const SomethingBiggerPopup = ({ isOpen, onClose, onContinue }) => {
  if (!isOpen) return null;

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
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
            <h1 className="popup-title">
              Lift your purpose through meaningful partnerships.
            </h1>

            <div className="connection-circle">
              <div className="circle-content">
                <p className="circle-label">Deepen your</p>
                <p className="circle-highlight">connection</p>
                <p className="circle-subtitle">by becoming part of</p>
                <p className="circle-subtitle">Something Bigger.</p>
              </div>
            </div>

            <div className="popup-description">
              <p>
                Purpose is often mistakenly thought about as a solo-endeavor—
                finding self fulfillment, becoming known for something, being the 
                very best at something. Yet the most meaningful contributions to 
                the world have been achieved by a combination of people coming 
                together with a shared purpose, or supporting each other to 
                achieve their individual purposes. Something Bigger explores the 
                inextricable links between purpose and partnership—helping you 
                identify, evolve, and scale the legacy of your impact in the world.
              </p>
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
