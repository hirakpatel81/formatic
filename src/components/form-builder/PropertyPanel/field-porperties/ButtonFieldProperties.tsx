import Accordion from "../../../common/Accordion";
import Switch from "../../../common/Switch/Switch";
import { ButtonFieldProperties as IButtonFieldProperties } from "../../../../models/form/FieldProperties";
import { FormField } from "../../../../models/form/FormField";
const ButtonFieldProperties: React.FC<{
  field: FormField;
  onUpdate: (field: FormField) => void;
}> = ({ field, onUpdate }) => {
  const properties = field.properties as IButtonFieldProperties;
  const handleBasePropertyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onUpdate({
      ...field,
      label: e.target.value,
    });
  };
  const handlePropertyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSwitchChange = (propertyName: string) => (checked: boolean) => {
    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        [propertyName]: checked,
      },
    });
  };
  const handleWidthChange = (checked: boolean) => {
    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        width: checked ? "full" : "half",
      },
    });
  };
  return (
    <>
      <Accordion title="Button Options" defaultExpanded={true}>
        <div className="mb-3">
          <label className="form-label">Button Text</label>
          <input
            type="text"
            className="form-control formatic-form-control"
            name="buttonText"
            value={field.label}
            onChange={handleBasePropertyChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select formatic-form-select"
            name="buttonStyle"
            value={properties.buttonStyle}
            onChange={handlePropertyChange}
          >
            <option value="submit">Submit</option>
            <option value="reset">Reset</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Style</label>
          <select
            className="form-select formatic-form-select"
            name="buttonStyle"
            value={properties.buttonStyle}
            onChange={handlePropertyChange}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Size</label>
          <select
            className="form-select formatic-form-select"
            name="buttonSize"
            value={field.properties.size || "medium"}
            onChange={handlePropertyChange}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Icon</label>
          <input
            type="text"
            className="form-control formatic-form-control"
            name="buttonIcon"
            value={properties.buttonIcon || ""}
            onChange={handlePropertyChange}
            placeholder="fas fa-icon-name"
          />
          <small className="form-text text-muted">
            Enter FontAwesome icon class
          </small>
        </div>

        <div className="mb-3">
          <Switch
            label="Full Width"
            checked={field.properties.width === "full"}
            onChange={handleWidthChange}
          />
        </div>
        <div className="mb-3">
          <Switch
            label="Disabled"
            checked={field.properties.disabled || false}
            onChange={handleSwitchChange("disabled")}
          />
        </div>
        <div>
          <label className="form-label">CSS Class</label>
          <input
            type="text"
            className="form-control formatic-form-control"
            name="className"
            value={field.properties.className || ""}
            onChange={handlePropertyChange}
          />
        </div>
      </Accordion>
    </>
  );
};
export default ButtonFieldProperties;
