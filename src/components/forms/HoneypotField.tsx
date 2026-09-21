import React from 'react';

// Hidden Honeypot Field per Layer 13 Zero-Trust protocol
// Hidden visually and from screen readers via styling, but bots will fill it
export const HoneypotField: React.FC<{ register: any }> = ({ register }) => {
  return (
    <div style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}>
      <label htmlFor="website_url">Leave this field blank</label>
      <input
        id="website_url"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register('honeypot')}
      />
    </div>
  );
};
