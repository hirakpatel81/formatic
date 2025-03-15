import React, { useRef } from "react";
import { Project } from "../../models/Project";
import DropdownPortal from "../common/DropdownPortal";
import "./ProjectActions.css";

interface ProjectActionsProps {
  project: Project;
  onRename: (project: Project) => void;
  onDelete: (project: Project) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({
  project,
  onRename,
  onDelete,
  isOpen,
  onToggle,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
    onRename(project);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(project); // Pass the entire project object
    onToggle(); // Close the dropdown
  };

  return (
    <div
      className="project-actions d-flex align-items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Form count badge */}
      <span
        className="project-count badge rounded-pill"
        style={{
          backgroundColor: "var(--color-50)",
          color: "var(--color-400)",
          fontSize: "12px",
          padding: "4px 8px",
          fontWeight: 500,
        }}
      >
        {project.formCount} {project.formCount === 1 ? "form" : "forms"}
      </span>

      {/* Settings button */}
      <button
        ref={buttonRef}
        className="project-actions-btn"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <i className="fas fa-gear"></i>
      </button>

      {/* Dropdown menu */}
      <DropdownPortal
        isOpen={isOpen}
        triggerRef={buttonRef!}
        onClose={onToggle}
      >
        <li>
          <button className="dropdown-item" onClick={handleRename}>
            <i className="fas fa-pen me-2 text-secondary"></i>
            Rename
          </button>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item text-danger" onClick={handleDelete}>
            <i className="fas fa-trash-alt me-2"></i>
            Delete
          </button>
        </li>
      </DropdownPortal>
    </div>
  );
};

export default ProjectActions;
