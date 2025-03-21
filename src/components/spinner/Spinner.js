import React from 'react';

const Spinner = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="200"
            height="200"
            style={{ shapeRendering: 'auto', display: 'block'}}
        >
            <g>
                {Array.from({ length: 36 }).map((_, index) => (
                    <g key={index} transform={`rotate(${index * 10} 50 50)`}>
                        <rect fill="#ffffff" height="11" width="3" y="17.5" x="48.5">
                            <animate
                                repeatCount="indefinite"
                                begin={`-${(index + 1) * 0.027777777777777776}s`}
                                dur="1s"
                                keyTimes="0;1"
                                values="1;0"
                                attributeName="opacity"
                            />
                        </rect>
                    </g>
                ))}
            </g>
        </svg>
    );
};

export default Spinner;