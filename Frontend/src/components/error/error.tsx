import React from 'react';
import './error.scss';

const Error: React.FC = () => {
  return (
    <div className="error-container">
      <img
        src="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/alert-circle-outline.svg"
        alt="Error occurred"
        className="error-image"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We apologize for the inconvenience. Please try again later.</p>
      <button className="retry-button" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  );
};

export default Error;
