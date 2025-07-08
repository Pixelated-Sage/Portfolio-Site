import React, { useState, useRef } from 'react';

const HoverGlowEffect = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full rounded-xl overflow-hidden"
    >
      <div
        className="absolute w-full h-full pointer-events-none transition-all duration-200 ease-out"
        style={{
          background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.15), transparent 80%)`,
        }}
      />
    </div>
  );
};

export default HoverGlowEffect;
