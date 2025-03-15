import React, { useState, useEffect } from "react";
import { FormField } from "../../../../models/form/FormField";

import { CheckboxFieldProperties as ICheckboxFieldProperties } from "../../../../models/form/FieldProperties";
import Accordion from "../../../common/Accordion";

interface CheckboxFieldPropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const CheckboxFieldProperties: React.FC<CheckboxFieldPropertiesProps> = ({
  field,
  onUpdate,
}) => {
  const [optionsText, setOptionsText] = useState("");

  useEffect(() => {
    const properties = field.properties as ICheckboxFieldProperties;
    const text = properties.options
      .map((opt) =>
        opt.label === opt.value ? opt.value : `${opt.value}|${opt.label}`
      )
      .join("\n");
    setOptionsText(text);
  }, [field.fieldId]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setOptionsText(newText);

    const parsedOptions = newText
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const [value, label] = line.split("|").map((s) => s.trim());
        return {
          value: value || "",
          label: label || value || "",
        };
      })
      .filter((option) => option.value !== "");

    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        options: parsedOptions,
      },
    });
  };

  const handleDefaultValueChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        defaultValue: selectedOptions,
      },
    });
  };
  const properties = field.properties as ICheckboxFieldProperties;

  return (
    <>
      <Accordion title="Checkbox Options" defaultExpanded={true}>
        <div className="mb-3">
          <label className="form-label">Options List (value|label)</label>
          <textarea
            className="form-control formatic-form-control"
            value={optionsText}
            onChange={handleTextChange}
            placeholder="value|label&#10;value2|label2&#10;value3"
            rows={6}
          />
          <small className="form-text text-muted">
            Enter one option per line. Format: value|label or just value
          </small>
        </div>
        <div className="mb-3">
          <label className="form-label">Default Selected Values</label>
          <select
            className="form-select formatic-form-select"
            multiple
            size={Math.min(properties.options.length, 5)}
            value={properties.defaultValue || []}
            onChange={handleDefaultValueChange}
          >
            {properties.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">
            Hold Ctrl/Cmd to select multiple options
          </small>
        </div>
      </Accordion>
    </>
  );
};

export default CheckboxFieldProperties;
