export const AuthErrorMessage: React.FC<{ error: string | null }> = ({
  error,
}) => {
  if (!error) return null;

  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="fas fa-exclamation-circle me-2"></i>
      <div>{error}</div>
    </div>
  );
};
