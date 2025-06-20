import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="not-found d-flex justify-content-center align-items-center flex-column mt-5">
      <div className="not-found__container d-flex flex-column justify-content-center align-items-center">
        <img
          src="https://http.cat/404"
          alt="404 Not Found"
          className="not-found__image"
        />
        <h1 className="not-found__title mt-2">Oops! Page Not Found</h1>
        <p className="not-found__text mt-2">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button
          className="not-found__button mt-2 d-flex justify-content-center align-items-center error-button"
          onClick={() => (window.location.href = '/')}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
