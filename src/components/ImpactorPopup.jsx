import React from 'react';
import './ImpactorPopup.css';

export const ImpactorPopup = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <div className="impactor-popup">
            <div className="impactor-images-container">
                {/* Main Character */}
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

                {/* Partner */}
                <div className="impactor-image impactor-image-partner">
                    {data.partnerImage ? (
                        <img 
                            src={data.partnerImage} 
                            alt={data.partner}
                        />
                    ) : (
                        <div className="impactor-placeholder">
                            {data.partner?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            <h2 className="impactor-name">{data.name}</h2>

            <div className="impactor-partner">
                Teamed up with: <span>{data.partner}</span>
            </div>

            <p className="impactor-fact">{data.fact}</p>

            <button
                onClick={onClose}
                className="impactor-button"
            >
                ACKNOWLEDGMENT RECEIVED
            </button>
        </div>
    );
};
