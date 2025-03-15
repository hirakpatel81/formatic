import React from "react";
import { FormField } from "../../../../models/form/FormField";
import { TextFieldProperties as ITextFieldProperties } from "../../../../models/form/FieldProperties";
import Accordion from "../../../common/Accordion";

interface TextFieldPropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const TextFieldProperties: React.FC<TextFieldPropertiesProps> = ({
  field,
  onUpdate,
}) => {
  // Handle changes to text field specific properties
  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Type assertion to access text field specific properties
  const properties = field.properties as ITextFieldProperties;
  return (
    <>
      {/* <Accordion title="Validation & Constraints" defaultExpanded={true}>
        <div className="mb-3">
          <label className="form-label">Minimum Length</label>
          <input
            type="number"
            className="form-control"
            name="minLength"
            value={properties.minLength || ""}
            onChange={handlePropertyChange}
            min={0}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Maximum Length</label>
          <input
            type="number"
            className="form-control"
            name="maxLength"
            value={properties.maxLength || ""}
            onChange={handlePropertyChange}
            min={0}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Pattern</label>
          <input
            type="text"
            className="form-control"
            name="pattern"
            value={properties.pattern || ""}
            onChange={handlePropertyChange}
            placeholder="Regular expression pattern"
          />
          <small className="form-text text-muted">
            Enter a regular expression to validate the input
          </small>
        </div>
      </Accordion> */}
    </>
  );
};

export default TextFieldProperties;
