import React from 'react';

const IconButton = ({ onClick, children, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`hover:bg-gray-100 p-1.5 rounded ${className}`}
        >
            {children}
        </button>
    );
};

export default IconButton;
