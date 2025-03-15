import React, { useState, useEffect } from "react";
import { FormField } from "../../../../models/form/FormField";

import { RadioFieldProperties as IRadioFieldProperties } from "../../../../models/form/FieldProperties";
import Accordion from "../../../common/Accordion";

interface RadioFieldPropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const RadioFieldProperties: React.FC<RadioFieldPropertiesProps> = ({
  field,
  onUpdate,
}) => {
  const [optionsText, setOptionsText] = useState("");

  // Initialize textarea content from field options
  useEffect(() => {
    const properties = field.properties as IRadioFieldProperties;
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

    // Parse and update options
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
    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        defaultValue: e.target.value,
      },
    });
  };
  const properties = field.properties as IRadioFieldProperties;

  return (
    <>
      <Accordion title="Radio Options" defaultExpanded={true}>
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
          <label className="form-label">Default Selected Value</label>
          <select
            className="form-select formatic-form-select"
            value={properties.defaultValue || ""}
            onChange={handleDefaultValueChange}
          >
            <option value="">None</option>
            {properties.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </Accordion>
    </>
  );
};

export default RadioFieldProperties;
