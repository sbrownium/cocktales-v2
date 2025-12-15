import React from 'react';
import '../../styles/Button.css'

export default function Button({
    handleClick,
    children,
    className,
    reference
}) {
    return (
        <button
            ref={reference}
            className={className}
            onClick={handleClick}
            onKeyDown={(e) =>
              e.key === 'Enter' ? handleClick(e) : ''
            }
        >{children}</button>
    )
};