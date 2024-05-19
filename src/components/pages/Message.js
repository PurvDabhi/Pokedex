import React from 'react';

export default function Message({ msg, bgColor }) {
    const styles = {
        padding: '1rem',
        marginBottom: '1rem',
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
        backgroundColor: bgColor,
    };

    return (
        <div style={styles}>
            <p>{msg}</p>
        </div>
    );
}
