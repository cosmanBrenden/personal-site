// RssButton.jsx
import React from 'react';
import './RssButton.css'; // Optional for styling

const RssButton = ({ 
  url = "/feed",
  label = "RSS Feed",
  size = "medium",
  variant = "primary",
  showLabel = false
}) => {
  // Size classes
  const sizeClasses = {
    small: 'rss-btn--small',
    medium: 'rss-btn--medium',
    large: 'rss-btn--large'
  };

  // Variant classes
  const variantClasses = {
    primary: 'rss-btn--primary',
    secondary: 'rss-btn--secondary',
    outline: 'rss-btn--outline'
  };

  return (
    <a
      href={url}
      className={`rss-btn ${sizeClasses[size]} ${variantClasses[variant]}`}
      aria-label={`Subscribe to ${label} RSS feed`}
      title={`Subscribe to RSS feed`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* SVG RSS Icon */}
      <svg 
        className="rss-icon" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0 0h24v24H0z" fill="none"/>
        <circle cx="6.18" cy="17.82" r="2.18"/>
        <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/>
      </svg>
      
      {showLabel && <span className="rss-label">{label}</span>}
    </a>
  );
};

export default RssButton;