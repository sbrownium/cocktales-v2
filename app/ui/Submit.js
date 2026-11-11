import React from 'react';
import '../styles/Submit.css';

export default function Submit({
    handleClick,
    value,
    className
}) {
    return (
        <input
            className={className}
            type="submit"
            value={value}
            onClick={handleClick}
            onKeyDown={(e) =>
              e.key === 'Enter' ? handleClick(e) : ''
            }
        />
    )
};