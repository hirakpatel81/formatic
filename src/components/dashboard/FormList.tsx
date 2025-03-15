import React, { useRef, useEffect } from "react";
import { Form } from "../../models/form/Form";
import NoResponses from "./NoResponses";

interface FormListProps {
  form: Form;
  onEdit: (formId: string) => void;
  onDelete: (form: Form) => void;
  onRename: (formId: string) => void;
  isDropdownOpen: boolean;
  onDropdownToggle: (formId: string) => void;
}

const FormList: React.FC<FormListProps> = ({
  form,
  onEdit,
  onDelete,
  onRename,
  isDropdownOpen,
  onDropdownToggle,
}) => {
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDropdownToggle(form.id);
  };

  const handleRenameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRename(form.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(form);
    onDropdownToggle(form.id);
  };

  return (
    <div className="col-12 mb-3">
      <div
        className="card border shadow-sm position-relative"
        onClick={() => onEdit(form.id)}
        style={{
          cursor: "pointer",

          position: "relative",
          zIndex: isDropdownOpen ? 2 : 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="card-body d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center flex-grow-1">
            <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
              <i className="fas fa-align-left text-secondary"></i>
            </div>
            <div className="d-flex flex-column">
              <h6 className="mb-1">{form.title}</h6>
              <div className="d-flex align-items-center gap-3">
                <NoResponses />
                <small className="text-muted">
                  Created {new Date(form.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
          <div className="dropdown" onClick={handleDropdownClick}>
            <button
              className="btn btn-link text-secondary p-2"
              type="button"
              onClick={handleDropdownToggle}
              aria-expanded={isDropdownOpen}
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
            <div
              className={`dropdown-menu dropdown-menu-end ${
                isDropdownOpen ? "show" : ""
              }`}
              style={{
                minWidth: "180px",
                padding: "0.5rem 0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                zIndex: 3,
                position: "absolute",
              }}
            >
              <button
                className="dropdown-item d-flex align-items-center"
                onClick={handleRenameClick}
              >
                <i className="fas fa-pen me-2"></i>
                Rename
              </button>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item d-flex align-items-center text-danger"
                onClick={handleDeleteClick}
              >
                <i className="fas fa-trash-alt me-2"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormList;
