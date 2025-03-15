import React from "react";
import logo from "../../assets/logo.svg";
import "./AppLoader.css";

/**
 * A branded loading screen for the application showing a logo and loading animation
 */
const AppLoader: React.FC = () => {
  return (
    <div className="app-loader-container">
      <div className="app-loader-content">
        <div className="app-logo-container">
          <img src={logo} alt="Formatic.app" className="app-logo" />
          <div className="app-loader-spinner">
            <div className="app-loader-dot"></div>
            <div className="app-loader-dot"></div>
            <div className="app-loader-dot"></div>
          </div>
        </div>
        <p className="loading-text">Loading application...</p>
      </div>
    </div>
  );
};

export default AppLoader;
