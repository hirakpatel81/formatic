interface NoFormsEmptyStateProps {
  projectId: string;
  onCreateForm: () => void;
}

export const NoFormsEmptyState: React.FC<NoFormsEmptyStateProps> = ({
  projectId,
  onCreateForm,
}) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-h-[400px] p-4">
      <div className="text-center" style={{ maxWidth: "800px" }}>
        <div className="mb-5">
          <i className="fas fa-file-alt text-secondary fs-1 mb-4 d-block"></i>
          <h4 className="mb-2">Create your first form</h4>
          <p className="text-secondary mb-4">
            Start building amazing forms to collect information and gather
            responses.
          </p>
        </div>
        <button className="btn formatic-btn-primary" onClick={onCreateForm}>
          <i className="fas fa-plus me-2"></i>
          Create Form
        </button>
      </div>
    </div>
  );
};
