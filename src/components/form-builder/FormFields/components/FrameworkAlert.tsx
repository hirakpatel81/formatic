import React from "react";

import { Framework } from "../../../../models/form/Framework";

interface FrameworkAlertProps {
  framework: Framework;
  severity?: "error" | "warning" | "info" | "success";
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const FrameworkAlert: React.FC<FrameworkAlertProps> = ({
  framework,
  severity = "info",
  title,
  icon,
  className = "",
  children,
}) => {
  // Bootstrap-style alert
  if (framework === Framework.BOOTSTRAP) {
    const severityMap = {
      error: "danger",
      warning: "warning",
      info: "info",
      success: "success",
    };

    return (
      <div
        className={`alert alert-${severityMap[severity]} ${className}`}
        role="alert"
      >
        {icon}
        {title}
        {children}
      </div>
    );
  }

  // Default to Bootstrap style for custom framework
  return (
    <div className={`alert alert-${severity} ${className}`} role="alert">
      {icon}
      {title && <strong className="me-2">{title}</strong>}
      {children}
    </div>
  );
};

export default FrameworkAlert;
