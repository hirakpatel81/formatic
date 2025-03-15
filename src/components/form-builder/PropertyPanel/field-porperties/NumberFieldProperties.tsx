import React from "react";
import { FormField } from "../../../../models/form/FormField";
import { NumberFieldProperties as INumberFieldProperties } from "../../../../models/form/FieldProperties";
import Accordion from "../../../common/Accordion";

interface NumberFieldPropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const NumberFieldProperties: React.FC<NumberFieldPropertiesProps> = ({
  field,
  onUpdate,
}) => {
  // Handle changes to number field specific properties
  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value);

    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        [e.target.name]: value,
      },
    });
  };

  // Type assertion to access number field specific properties
  const properties = field.properties as INumberFieldProperties;

  return (
    <>
      {/* <Accordion title="Validation & Constraints" defaultExpanded={true}>
        <div className="mb-3">
          <label className="form-label">Minimum Value</label>
          <input
            type="number"
            className="form-control formatic-form-control"
            name="min"
            value={properties.min ?? ""}
            onChange={handlePropertyChange}
          />
          <small className="form-text text-muted">
            The minimum value that can be entered
          </small>
        </div>

        <div className="mb-3">
          <label className="form-label">Maximum Value</label>
          <input
            type="number"
            className="form-control formatic-form-control"
            name="max"
            value={properties.max ?? ""}
            onChange={handlePropertyChange}
          />
          <small className="form-text text-muted">
            The maximum value that can be entered
          </small>
        </div>
      </Accordion> */}
    </>
  );
};

export default NumberFieldProperties;
