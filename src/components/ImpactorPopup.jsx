import React from 'react';
import './ImpactorPopup.css';

export const ImpactorPopup = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <div className="impactor-popup">
            <div className="impactor-images-container">
                <div className="impactor-image impactor-image-main">
                    {data.image ? (
                        <img 
                            src={data.image} 
                            alt={data.name}
                        />
                    ) : (
                        <div className="impactor-placeholder">
                            {data.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            <h2 className="impactor-name">{data.name}</h2>

            <div className="impactor-movement">
                <span className="movement-label">Movement:</span> {data.movement}
            </div>

            <div className="impactor-section">
                <h3 className="section-title">Who:</h3>
                <p className="section-content">{data.who}</p>
            </div>

            <div className="impactor-section">
                <h3 className="section-title">Did you know?</h3>
                <p className="section-content">{data.didYouKnow}</p>
            </div>

            <div className="impactor-section impactor-reflection">
                <h3 className="section-title">Reflection:</h3>
                <p className="section-content">{data.reflection}</p>
            </div>

            <button
                onClick={onClose}
                className="impactor-button"
            >
                CONTINUE TO TASK
            </button>
        </div>
    );
};
