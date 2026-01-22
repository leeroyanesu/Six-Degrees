import React from 'react';

export const Notebook = ({ entries = [] }) => {
    // Fallback if no entries
    const displayEntries = entries.length > 0 ? entries : [
        { name: "Unknown", checked: false },
        { name: "Unknown", checked: false },
        { name: "Unknown", checked: false },
        { name: "Unknown", checked: false },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '200px',
            height: '280px',
            background: 'rgba(255, 255, 240, 0.9)', // Off-white notebook paper color
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, #696969 30px)',
            border: '10px solid #8B4513', // Brown leather-like border
            borderRadius: '5px 15px 15px 5px',
            padding: '20px',
            fontFamily: '"Indie Flower", "Comic Sans MS", cursive, sans-serif',
            color: '#333',
            boxShadow: '5px 5px 15px rgba(0,0,0,0.5)',
            zIndex: 1000,
            transform: 'rotate(-2deg)' // Slight tilt for realism
        }}>
            <h3 style={{
                margin: '0 0 15px 0',
                borderBottom: '2px solid #333',
                paddingBottom: '5px',
                textAlign: 'center'
            }}>
                Notes
            </h3>

            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '18px',
                lineHeight: '30px'
            }}>
                {displayEntries.map((entry, index) => (
                    <li key={index} style={{
                        borderBottom: '1px dashed #aaa',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textDecoration: entry.checked ? 'line-through' : 'none',
                        color: entry.checked ? '#777' : '#333'
                    }}>
                        {/* Checkbox */}
                        <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid #555',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            fontSize: '16px',
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
    );
};
