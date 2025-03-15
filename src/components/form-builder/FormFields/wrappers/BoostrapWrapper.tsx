import { FormField } from "../../../../models/form/FormField";

interface BootstrapWrapperProps {
  field: FormField;
  mode: "builder" | "preview";
  layout?: "default" | "horizontal";
  children: React.ReactNode;
}

const BootstrapWrapper: React.FC<BootstrapWrapperProps> = ({
  field,
  mode,
  layout = "default",
  children,
}) => {
  if (mode === "preview") {
    const wrapperClass =
      layout === "horizontal" ? "form-group row mb-3" : "form-group mb-3";
    const labelClass =
      layout === "horizontal" ? "col-sm-2 col-form-label" : "form-label";
    return (
      <div className={wrapperClass}>
        <label
          className={labelClass}
          htmlFor={field.fieldId}
          hidden={field.properties.hidden}
        >
          {field.label}
          {field.required && <span className="text-danger ms-1">*</span>}
        </label>
        {layout === "horizontal" ? (
          <>
            <div className="col-sm-10">{children}</div>
          </>
        ) : (
          <>{children}</>
        )}
      </div>
    );
  }

  return (
    <div className="form-field-group">
      <label
        className="form-label"
        htmlFor={field.fieldId}
        hidden={field.properties.hidden}
      >
        {field.label}
        {field.required && <span className="text-danger ms-1">*</span>}
      </label>
      <div className="flex-grow-1">{children}</div>
    </div>
  );
};

export default BootstrapWrapper;
