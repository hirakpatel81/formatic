import React from "react";
import logo from "../../assets/logo.svg";
import { NAVBAR_HEIGHT } from "../../constants/Layout";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import "./Navbar.css";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { appUser, logout } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search term:", e.target.value);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-white border-bottom shadow-sm"
      style={{ padding: "0.5rem 1rem" }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a
          className="navbar-brand me-4"
          onClick={() => navigate(ROUTES.DASHBOARD)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Formatic.app"
            style={{
              height: NAVBAR_HEIGHT,
              width: "auto",
            }}
          />
        </a>

        {/* Search Bar */}
        <div
          className="d-none d-md-block"
          style={{ maxWidth: "400px", width: "100%", margin: "0 2.5rem" }}
        >
          <div className="position-relative">
            <i
              className="fas fa-search position-absolute top-50 translate-middle-y"
              style={{ left: "12px", color: "var(--color-500)" }}
            ></i>
            <input
              type="text"
              className="form-control formatic-form-control"
              placeholder="Search..."
              onChange={handleSearchChange}
              style={{
                paddingLeft: "36px",
                height: "38px",
                fontSize: "14px",
              }}
            />
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center gap-4">
          <div className="dropdown">
            <button
              className="btn btn-light py-1 px-3 d-flex align-items-center gap-2 border"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
              style={{
                height: "38px",
                backgroundColor: "white",
                transition: "all 0.2s ease",
                borderRadius: "var(--radius)",
              }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "var(--color-100)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--color-700)",
                }}
              >
                {appUser?.fullName ? getInitials(appUser.fullName) : "U"}
              </div>
              <span
                className="text-dark d-none d-md-inline"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {appUser?.fullName! || "User"}
              </span>
              <i
                className="fas fa-chevron-down text-muted"
                style={{
                  fontSize: "12px",
                }}
              ></i>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end shadow-sm"
              style={{ borderRadius: "8px", border: "1px solid #e9ecef" }}
            >
              <li>
                <button
                  className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger"
                  onClick={logout}
                >
                  <i
                    className="fas fa-sign-out-alt"
                    style={{ width: "16px" }}
                  ></i>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
