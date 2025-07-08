import React from 'react'

function StarsBg() {
  return (
    <div className=''>
        {/* Twinkling Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`set1-${i}`}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`set2-${i}`}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5 + 5}s`,
            }}
          />
        ))}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`set3-${i}`}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5 + 10}s`,
            }}
          />
        ))}

    </div>
  )
}

export default StarsBg