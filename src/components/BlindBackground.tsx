import React from 'react';

const BlindBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-5">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform scale-150"
        >
          {/* Zebra Blind */}
          <g transform="translate(100, 100)">
            <rect x="0" y="0" width="200" height="400" fill="#E5E7EB" />
            <rect x="0" y="0" width="200" height="50" fill="#9CA3AF" />
            <rect x="0" y="100" width="200" height="50" fill="#9CA3AF" />
            <rect x="0" y="200" width="200" height="50" fill="#9CA3AF" />
            <rect x="0" y="300" width="200" height="50" fill="#9CA3AF" />
          </g>

          {/* Roller Blind */}
          <g transform="translate(400, 100)">
            <rect x="0" y="0" width="200" height="400" fill="#E5E7EB" />
            <circle cx="100" cy="20" r="15" fill="#9CA3AF" />
            <rect x="0" y="40" width="200" height="360" fill="#D1D5DB" />
          </g>

          {/* Honeycomb Blind */}
          <g transform="translate(100, 520)">
            <rect x="0" y="0" width="200" height="400" fill="#E5E7EB" />
            <path
              d="M0 50 L100 0 L200 50 L200 150 L100 200 L0 150 Z"
              fill="#9CA3AF"
            />
            <path
              d="M0 150 L100 100 L200 150 L200 250 L100 300 L0 250 Z"
              fill="#9CA3AF"
            />
            <path
              d="M0 250 L100 200 L200 250 L200 350 L100 400 L0 350 Z"
              fill="#9CA3AF"
            />
          </g>

          {/* Shangrila Blind */}
          <g transform="translate(400, 520)">
            <rect x="0" y="0" width="200" height="400" fill="#E5E7EB" />
            <path
              d="M0 50 C50 0, 150 0, 200 50 C150 100, 50 100, 0 50"
              fill="#9CA3AF"
            />
            <path
              d="M0 150 C50 100, 150 100, 200 150 C150 200, 50 200, 0 150"
              fill="#9CA3AF"
            />
            <path
              d="M0 250 C50 200, 150 200, 200 250 C150 300, 50 300, 0 250"
              fill="#9CA3AF"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BlindBackground; 