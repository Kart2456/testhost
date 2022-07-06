import React from 'react';

export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Cculka</h2>
            <p>Your Cculka: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>otcuda Cculka: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>koll clicks po cculke: <strong>{link.to}</strong></p>
            <p>Data: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}