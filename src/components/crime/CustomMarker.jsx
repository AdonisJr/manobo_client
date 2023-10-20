import React, { useState } from 'react';

function CustomMarker({ lat, lng, icon, title }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`custom-marker ${isHovered ? 'hovered' : ''}`}
    >
      <img src={icon} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export default CustomMarker;