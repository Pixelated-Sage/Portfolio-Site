import React, { useRef } from 'react';

const MagneticHover = ({ children }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;

    el.style.transform = `rotateX(${y}deg) rotateY(${-x}deg) scale(1.03)`;
  };

  const resetTransform = () => {
    const el = ref.current;
    el.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
      className="transition-transform duration-200"
    >
      {children}
    </div>
  );
};

export default MagneticHover;
