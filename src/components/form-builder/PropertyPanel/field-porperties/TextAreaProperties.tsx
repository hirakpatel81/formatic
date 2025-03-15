import React from "react";
import { FormField } from "../../../../models/form/FormField";
import { TextAreaFieldProperties } from "../../../../models/form/FieldProperties";
import Accordion from "../../../common/Accordion";
import Switch from "../../../common/Switch/Switch";

interface TextAreaPropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const TextAreaProperties: React.FC<TextAreaPropertiesProps> = ({
  field,
  onUpdate,
}) => {
  // Handler for properties
  const handleFieldPropertyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === "number"
        ? e.target.value === ""
          ? undefined
          : Number(e.target.value)
        : e.target.value;

    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        [e.target.name]: value,
      },
    });
  };

  const properties = field.properties as TextAreaFieldProperties;

  return (
    <>
      {/* Validation Properties
      <Accordion title="Validation & Constraints">
        <div className="mb-3">
          <label className="form-label">Minimum Length</label>
          <input
            type="number"
            className="form-control formatic-form-control"
            name="minLength"
            value={properties.minLength || ""}
            onChange={handleFieldPropertyChange}
            min={0}
          />
          <small className="form-text text-muted">
            Minimum number of characters required
          </small>
        </div>

        <div className="mb-3">
          <label className="form-label">Maximum Length</label>
          <input
            type="number"
            className="form-control formatic-form-control"
            name="maxLength"
            value={properties.maxLength || ""}
            onChange={handleFieldPropertyChange}
            min={0}
          />
          <small className="form-text text-muted">
            Maximum number of characters allowed
          </small>
        </div>
      </Accordion> */}
    </>
  );
};

export default TextAreaProperties;
