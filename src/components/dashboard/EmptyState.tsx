import React from "react";

interface EmptyStateProps {
  onCreateProject: () => void;
  onCreateForm: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  onCreateProject,
  onCreateForm,
}) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-h-[400px] p-4">
      <div className="text-center" style={{ maxWidth: "800px" }}>
        <div className="mb-5">
          <i className="fas fa-folder-open text-secondary fs-1 mb-4 d-block"></i>
          <h4 className="mb-2">Looks like you're just getting started!</h4>
          <p className="text-secondary mb-4">Choose how you'd like to begin:</p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card h-100 border shadow-sm">
              <div className="card-body p-4 text-center">
                <i className="fas fa-sitemap fs-2 mb-3"></i>
                <h5 className="mb-3">I want to organize my forms</h5>
                <p className="text-secondary small mb-4">
                  Start by creating a project to group your related forms
                  together.
                </p>
                <button
                  className="btn formatic-btn-outline-primary w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCreateProject();
                  }}
                >
                  Create a Project
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 border shadow-sm">
              <div className="card-body p-4 text-center">
                <i className="fas fa-file-alt fs-2 mb-3"></i>
                <h5 className="mb-3">I want to create a form now</h5>
                <p className="text-secondary small mb-4">
                  Jump right in - we'll help organize it into a project
                  automatically.
                </p>
                <button
                  className="btn formatic-btn-primary w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCreateForm();
                  }}
                >
                  Create a Form
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-secondary small">
          Don't worry about the structure now - you can always organize your
          forms into different projects later.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
