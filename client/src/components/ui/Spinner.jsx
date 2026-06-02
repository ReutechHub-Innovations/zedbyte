import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 28 }) => {
  const style = { width: size, height: size };
  return (
    <div className="spinner" style={style} aria-hidden="true">
      <svg viewBox="0 0 50 50" className="spinner-svg">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
      </svg>
    </div>
  );
};

export default Spinner;
