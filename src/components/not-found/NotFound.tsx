import React from "react";

function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-4 text-secondary">Page not found</p>
        <a href="/" className="btn formatic-btn-primary mt-3">
          Go Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
