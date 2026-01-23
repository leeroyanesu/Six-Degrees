import React, { useState } from 'react';

export const Notebook = ({ entries = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Fallback if no entries
    const displayEntries = entries.length > 0 ? entries : [
        { name: "Unknown", checked: false },
        { name: "Unknown", checked: false },
        { name: "Unknown", checked: false },
        { name: "Unknown", checked: false },
    ];

    return (
        <>
            {/* Mobile toggle button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                style={{
                    position: 'fixed',
                    bottom: '200px',
                    left: '10px',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(139, 69, 19, 0.9)',
                    border: '3px solid #8B4513',
                    borderRadius: '10px',
                    color: '#FFD700',
                    fontSize: '24px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                    zIndex: 2000,
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                className="notebook-toggle"
            >
                📔
            </button>

            <div 
                className="notebook-container"
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '10px',
                    width: '180px',
                    height: '200px',
                    background: 'rgba(255, 255, 240, 0.9)', // Off-white notebook paper color
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, #696969 30px)',
                    border: '8px solid #8B4513', // Brown leather-like border
                    borderRadius: '5px 15px 15px 5px',
                    padding: '15px',
                    fontFamily: '"Indie Flower", "Comic Sans MS", cursive, sans-serif',
                    color: '#333',
                    boxShadow: '5px 5px 15px rgba(0,0,0,0.5)',
                    zIndex: 2000,
                    transform: 'rotate(-2deg)', // Slight tilt for realism
                    transition: 'transform 0.3s ease, opacity 0.3s ease'
                }}>
            <style>{
                `@media (max-width: 768px) {
                    .notebook-toggle {
                        display: flex !important;
                        align-items: center;
                        justify-content: center;
                    }
                    .notebook-container {
                        width: 140px !important;
                        height: 160px !important;
                        bottom: 5px !important;
                        left: ${isOpen ? '5px' : '-200px'} !important;
                        padding: 10px !important;
                        border-width: 6px !important;
                        opacity: ${isOpen ? '1' : '0'} !important;
                        pointer-events: ${isOpen ? 'auto' : 'none'} !important;
                    }
                    .notebook-title {
                        font-size: 12px !important;
                        margin-bottom: 8px !important;
                    }
                    .notebook-list {
                        font-size: 11px !important;
                        line-height: 20px !important;
                    }
                    .notebook-checkbox {
                        width: 14px !important;
                        height: 14px !important;
                        font-size: 10px !important;
                    }
                }`
            }</style>
            <h3 className="notebook-title" style={{
                margin: '0 0 15px 0',
                borderBottom: '2px solid #333',
                paddingBottom: '5px',
                textAlign: 'center',
                fontSize: '16px'
            }}>
                Notes
            </h3>

            <ul className="notebook-list" style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '14px',
                lineHeight: '30px'
            }}>
                {displayEntries.map((entry, index) => (
                    <li key={index} style={{
                        borderBottom: '1px dashed #aaa',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: entry.checked ? 'line-through' : 'none',
                        color: entry.checked ? '#777' : '#333'
                    }}>
                        {/* Checkbox */}
                        <div className="notebook-checkbox" style={{
                            width: '18px',
                            height: '18px',
                            border: '2px solid #555',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            fontSize: '14px',
                            color: 'green',
                            fontWeight: 'bold',
                            flexShrink: 0
                        }}>
                            {entry.checked && "✓"}
                        </div>
                        {entry.name}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};
