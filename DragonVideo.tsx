import React from 'react';
import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { SceneContainer } from './components/SceneContainer';
import { Dragon } from './components/Dragon';

const Caption: React.FC<{ text: string; start: number; duration: number }> = ({ text, start, duration }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(
        frame,
        [start, start + 10, start + duration - 10, start + duration],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    if (frame < start || frame > start + duration) return null;

    return (
        <div style={{
            position: 'absolute',
            bottom: 250,
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: 60,
            fontWeight: 'bold',
            textShadow: '0 0 20px rgba(0,0,0,0.8)',
            opacity,
            padding: '0 50px',
        }}>
            {text}
        </div>
    );
};

const ToolItem: React.FC<{ name: string; index: number }> = ({ name, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance animation (starting from frame 360, which is 12s)
    const entrance = spring({
        frame: frame - (360 + index * 10),
        fps,
        config: { damping: 12 },
    });

    return (
        <div style={{
            fontSize: 70,
            fontWeight: 900,
            marginBottom: 40,
            opacity: entrance,
            transform: `translateX(${(1 - entrance) * -100}px)`,
            background: 'linear-gradient(to right, #ec4899, #f472b6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        }}>
            {index + 1}. {name}
        </div>
    );
};

export const DragonVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // Dragon flight path
    const dragonX = interpolate(frame, [0, 450], [-200, width + 400]);
    const dragonY = height / 2 + Math.sin(frame / 20) * 100;
    const rotation = Math.sin(frame / 20) * 10;

    const tools = ["ChatGPT", "Canva", "Grammarly", "Perplexity", "Midjourney"];

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a' }}>
            {/* Moving Background Stars */}
            <AbsoluteFill>
                {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${(i * 7.7 + frame * (1 + (i % 3))) % 100}%`,
                        top: `${(i * 13) % 100}%`,
                        width: 4,
                        height: 4,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        opacity: 0.3,
                    }} />
                ))}
            </AbsoluteFill>

            {/* Dragon Flying */}
            <div style={{
                position: 'absolute',
                left: dragonX,
                top: dragonY,
                transform: `rotate(${rotation}deg)`,
            }}>
                <Dragon scale={1.5} />
            </div>

            {/* Audio Captions (0s - 12s) */}
            <Caption text="Ready to skyrocket your productivity?" start={10} duration={80} />
            <Caption text="Here are the top 5 AI tools..." start={100} duration={80} />
            <Caption text="...every beginner should know!" start={190} duration={80} />
            <Caption text="Flying through the AI landscape..." start={280} duration={70} />

            {/* Final List (12s - 15s) */}
            {frame >= 360 && (
                <AbsoluteFill style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <h2 style={{ color: 'white', fontSize: 40, marginBottom: 60, opacity: 0.7 }}>TOP 5 BEGINNER AI TOOLS</h2>
                    <div style={{ textAlign: 'left' }}>
                        {tools.map((tool, i) => (
                            <ToolItem key={tool} name={tool} index={i} />
                        ))}
                    </div>
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
