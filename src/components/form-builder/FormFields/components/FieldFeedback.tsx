interface FieldFeedbackProps {
  primaryHelperText?: string;
  secondaryHelperText?: string;
  error?: string;
  mode?: "builder" | "preview";
}

const FieldFeedback: React.FC<FieldFeedbackProps> = ({
  primaryHelperText,
  secondaryHelperText,
  error,
  mode,
}) => {
  return (
    <>
      {primaryHelperText && (
        <small className="form-text text-muted d-block mt-1">
          {primaryHelperText}
        </small>
      )}
      {secondaryHelperText && (
        <small className="form-text text-muted d-block mt-1">
          {secondaryHelperText}
        </small>
      )}

      {mode === "preview" && error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </>
  );
};
export default FieldFeedback;
