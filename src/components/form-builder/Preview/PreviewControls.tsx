import React from "react";

import { Framework } from "../../../models/form/Framework";
interface PreviewControlProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  layout: "default" | "horizontal";
  onLayoutChange: (layout: "default" | "horizontal") => void;
  device: string;
  onDeviceChange: (device: string) => void;
  orientation: string;
  onOrientationChange: (orientation: string) => void;
  onClose: () => void;
  selectedFramework: Framework;
  onFrameworkChange: (framework: Framework) => void;
}
const PreviewControls: React.FC<PreviewControlProps> = ({
  theme,
  onThemeChange,
  layout,
  onLayoutChange,
  device,
  selectedFramework,
  onDeviceChange,
  orientation,
  onOrientationChange,
  onFrameworkChange,
  onClose,
}) => {
  const isOrientationEnabled = device === "tablet" || device === "mobile";

  return (
    <nav className="preview-controls border-bottom bg-light">
      <div className="container-fluid p-3">
        <div className="d-flex align-items-center">
          {/* Close button */}
          <div className="me-4">
            <button
              type="button"
              className="btn btn-outline-secondary formatic-btn-outline-secondary btn-sm"
              onClick={onClose}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Go back to editor
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            {/* Main controls wrapper */}

            <div className="d-flex align-items-center gap-2">
              {/* Theme Controls */}
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    theme === "light"
                      ? "formatic-btn-primary"
                      : "formatic-btn-outline-primary"
                  }`}
                  onClick={() => onThemeChange("light")}
                >
                  <i className="fas fa-sun me-2"></i>
                  Light
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    theme === "dark"
                      ? "formatic-btn-primary"
                      : "formatic-btn-outline-primary"
                  }`}
                  onClick={() => onThemeChange("dark")}
                >
                  <i className="fas fa-moon me-2"></i>
                  Dark
                </button>
              </div>

              {/* Layout Controls */}
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    layout === "default"
                      ? "formatic-btn-primary"
                      : "formatic-btn-outline-primary"
                  }`}
                  onClick={() => onLayoutChange("default")}
                >
                  <i className="fas fa-arrow-down me-2"></i>
                  Top
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    layout === "horizontal"
                      ? "formatic-btn-primary"
                      : "formatic-btn-outline-primary"
                  }`}
                  onClick={() => onLayoutChange("horizontal")}
                >
                  <i className="fas fa-arrow-right me-2"></i>
                  Horizontal
                </button>
              </div>

              {/* Viewport Controls */}
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    device === "desktop"
                      ? "formatic-btn-primary"
                      : "formatic-btn-outline-primary"
                  }`}
                  onClick={() => onDeviceChange("desktop")}
                  title="Desktop view"
                >
                  <i className="fas fa-desktop"></i>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    device === "tablet"
                      ? "formatic-btn-primary"
                      : "formatic-btn-outline-primary"
                  }`}
                  onClick={() => onDeviceChange("tablet")}
                  title="Tablet view"
                >
                  <i className="fas fa-tablet-alt"></i>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    device === "mobile"
                      ? "formatic-btn-primary"
                      : "formatic-btn-outline-primary"
                  }`}
                  onClick={() => onDeviceChange("mobile")}
                  title="Mobile view"
                >
                  <i className="fas fa-mobile-alt"></i>
                </button>
              </div>

              <button
                type="button"
                className={`btn btn-sm ${
                  orientation === "portrait"
                    ? "formatic-btn-primary"
                    : "formatic-btn-outline-primary"
                }`}
                onClick={() =>
                  onOrientationChange(
                    orientation === "portrait" ? "landscape" : "portrait"
                  )
                }
                disabled={!isOrientationEnabled}
              >
                <i
                  className={`fas fa-mobile-alt ${
                    orientation === "landscape" ? "fa-rotate-90" : ""
                  }`}
                ></i>
                <span className="ms-2">Rotate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PreviewControls;
