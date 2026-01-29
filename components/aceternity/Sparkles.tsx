"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

export const SparklesCore = (props: {
    id?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    particleDensity?: number;
    className?: string;
    particleColor?: string;
}) => {
    const {
        id = "sparkles",
        background = "transparent",
        minSize = 0.6,
        maxSize = 1.4,
        particleDensity = 100,
        className,
        particleColor = "#FFFFFF",
    } = props;

    const particles = useMemo(() => {
        return Array.from({ length: particleDensity }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * (maxSize - minSize) + minSize,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 10,
        }));
    }, [particleDensity, maxSize, minSize]);

    return (
        <div className={className} style={{ background }}>
            <div className="absolute inset-0">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particleColor,
                            boxShadow: `0 0 ${particle.size * 2}px ${particleColor}`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
