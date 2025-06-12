import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="d-inline-flex align-items-center gap-2 mb-3">
      <p className="text-secondary mb-0">
        {text1}{' '}
        <span className="fw-medium text-dark">{text2}</span>
      </p>
      <div className="bg-dark" style={{ width: '2rem', height: '2px' }}></div>
    </div>
  );
};

export default Title;
