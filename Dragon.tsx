import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Dragon: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Wing flap animation
    const flap = Math.sin(frame / 5) * 30; // Degrees of rotation

    // Gentle head bob
    const bob = Math.sin(frame / 15) * 5;

    return (
        <div style={{
            transform: `scale(${scale})`,
            filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.4))',
        }}>
            <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back Wing */}
                <g style={{ transform: `rotate(${flap}deg)`, transformOrigin: '150px 150px' }}>
                    <path d="M150 150 L50 80 L80 180 Z" fill="#9d174d" opacity="0.7" />
                    <path d="M150 150 L30 140 L80 180 Z" fill="#be185d" opacity="0.7" />
                </g>

                {/* Body */}
                <path d="M100 180 Q150 220 250 180 T350 160" stroke="#db2777" strokeWidth="40" strokeLinecap="round" fill="none" />
                <path d="M250 180 Q300 180 320 120" stroke="#db2777" strokeWidth="25" strokeLinecap="round" fill="none" />

                {/* Head */}
                <g style={{ transform: `translateY(${bob}px)` }}>
                    <circle cx="330" cy="110" r="25" fill="#db2777" />
                    <circle cx="340" cy="105" r="5" fill="white" /> {/* Eye */}
                    <path d="M340 125 Q355 130 365 115" stroke="#9d174d" strokeWidth="5" fill="none" /> {/* Horn */}
                </g>

                {/* Front Wing */}
                <g style={{ transform: `rotate(${-flap}deg)`, transformOrigin: '170px 160px' }}>
                    <path d="M170 160 L70 90 L100 190 Z" fill="#ec4899" />
                    <path d="M170 160 L50 150 L100 190 Z" fill="#f472b6" />
                </g>

                {/* Tail Spikes */}
                <path d="M120 195 L110 215 L130 205 Z" fill="#9d174d" />
                <path d="M150 205 L140 225 L160 215 Z" fill="#9d174d" />
            </svg>
        </div>
    );
};
