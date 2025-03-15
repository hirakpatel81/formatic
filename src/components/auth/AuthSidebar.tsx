import React from "react";
import logo from "../../assets/logo_light.svg";

interface AuthSidebarProps {
  title: string;
  subtitle: string;
  animationComponent?: React.ReactNode;
}

const AuthSidebar: React.FC<AuthSidebarProps> = ({
  title,
  subtitle,
  animationComponent,
}) => {
  return (
    <div
      className="auth-sidebar d-flex flex-column justify-content-between"
      style={{
        background:
          "linear-gradient(135deg, var(--color-600), var(--color-500))",
        color: "white",
        height: "100vh",
        padding: "3rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top section with logo */}
      <div style={{ marginBottom: "1.5rem" }}>
        <img src={logo} alt="Formatic Logo" style={{ height: "40px" }} />
      </div>

      {/* Middle section with title, subtitle, and information */}
      <div className="d-flex flex-column align-items-center text-center my-2">
        <h2 className="mb-2">{title}</h2>
        <p className="mb-3 text-light">{subtitle}</p>
        <div className="mb-4" style={{ maxWidth: "80%" }}>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            In this demo, all data is stored locally in your browser's{" "}
            <strong>LocalStorage</strong>. No data is sent to a server.
          </p>
        </div>
        <div className="auth-animation my-3">{animationComponent}</div>
      </div>

      {/* Bottom section with copyright */}
      <div
        className="text-center"
        style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}
      >
        <p className="mb-0">© {new Date().getFullYear()} Formatic</p>
      </div>

      {/* Decorative elements */}
      <div
        className="position-absolute"
        style={{
          bottom: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0,
        }}
      ></div>
      <div
        className="position-absolute"
        style={{
          top: "20%",
          left: "-100px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0,
        }}
      ></div>
    </div>
  );
};

export default React.memo(AuthSidebar, () => true);
