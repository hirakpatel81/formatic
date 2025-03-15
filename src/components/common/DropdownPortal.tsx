import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DropdownPortalProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  children: React.ReactNode;
}

const DropdownPortal: React.FC<DropdownPortalProps> = ({
  isOpen,
  triggerRef,
  onClose,
  children,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Update dropdown position when trigger element moves or window resizes
  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.right - 180 + window.scrollX, // 180px is dropdown width
        });
      }
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, triggerRef]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".dropdown-menu")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Create a portal to render the dropdown at the document root
  return createPortal(
    <div
      className="dropdown-menu show"
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
        minWidth: "180px",
        padding: "8px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default DropdownPortal;
