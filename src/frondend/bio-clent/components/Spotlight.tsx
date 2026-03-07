import React, { useRef, useState } from 'react';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

export const Spotlight: React.FC<SpotlightProps> = ({ 
  children, 
  className = "", 
  size = 600,
  color = "rgba(6, 182, 212, 0.15)" // Default to a cyan glow
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* The Glow Effect Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
        }}
      />
      
      {/* Content Children rendered directly to respect parent flex layout */}
      {children}
    </div>
  );
};