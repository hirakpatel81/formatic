import React, { useState } from "react";

interface AccordionProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  fullBorder?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  defaultExpanded = false,
  children,
  fullBorder = false,
}) => {
  const accordionId = React.useMemo(
    () => `accordion-${Math.random().toString(36).slice(2, 11)}`,
    []
  );
  const contentId = React.useMemo(
    () => `content-${Math.random().toString(36).slice(2, 11)}`,
    []
  );
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={`accordion-item ${fullBorder ? "border" : "border-bottom"}`}
    >
      <h2 className="accordion-header" id={accordionId}>
        <button
          className={`accordion-button bg-body-secondary ${
            !isExpanded ? "collapsed" : ""
          }`}
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          style={{
            padding: "0.75rem 1rem",
            boxShadow: "none",
          }}
        >
          {title}
        </button>
      </h2>
      <div
        id={contentId}
        className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
        aria-labelledby={accordionId}
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="accordion-body" style={{ padding: "1rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
