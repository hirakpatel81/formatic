import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-vh-100 bg-light">
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
};

export default AuthLayout;
