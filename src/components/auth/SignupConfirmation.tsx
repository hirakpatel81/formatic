import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { ROUTES } from "../../constants/Routes";

const SignupConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(ROUTES.SIGNIN);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-sm border-0"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="card-body p-4 p-md-5 text-center">
          <img
            src={logo}
            alt="Formatic Logo"
            className="mb-4"
            style={{ height: "40px" }}
          />

          <div className="mb-4">
            <h3 className="fw-bold mb-2">Demo Mode</h3>
            <p className="text-secondary">
              This is a demonstration page and does not process actual
              authentication. Please return to the login page and sign in using
              your credentials.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-link text-decoration-none w-100"
            style={{ color: "var(--color-500)", cursor: "pointer" }}
            onClick={handleNavigation}
          >
            Sign in to your account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupConfirmation;
