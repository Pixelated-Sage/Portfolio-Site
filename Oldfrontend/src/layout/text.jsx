import React from 'react'
import "../styles/theme.css"
const text = () => {
  return (
    <div>
        <div className="bg-bg text-text border border-border">
            <h1 className="text-heading">Heading</h1>
            <h2 className="text-subheading">Subheading</h2>
            <button className="bg-primary text-white hover:bg-secondary">Click</button>
        </div>
    </div>
  )
}

export default text