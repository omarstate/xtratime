import React from 'react';

const Button = ({ children, type = 'button', style = {}, ...props }) => (
  <button
    type={type}
    style={{
      width: '100%',
      padding: '12px 0',
      border: 'none',
      borderRadius: 12,
      background: 'linear-gradient(90deg, #1976ff 0%, #21cbf3 100%)',
      color: '#fff',
      fontWeight: 700,
      fontSize: '1.08rem',
      boxShadow: '0 2px 12px rgba(25,118,255,0.10)',
      cursor: 'pointer',
      transition: 'background 0.2s, transform 0.2s',
      outline: 'none',
      ...style
    }}
    {...props}
  >
    {children}
  </button>
);

export default Button; 