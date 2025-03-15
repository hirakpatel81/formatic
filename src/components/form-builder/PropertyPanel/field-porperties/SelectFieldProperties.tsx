// src/components/form-builder/PropertyPanel/field-properties/SelectFieldProperties.tsx
import React, { useState, useEffect } from "react";
import { FormField } from "../../../../models/form/FormField";
import Accordion from "../../../common/Accordion";
import Switch from "../../../common/Switch/Switch";
import { SelectFieldProperties as ISelectFieldProperties } from "../../../../models/form/FieldProperties";

interface SelectFieldPropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const SelectFieldProperties: React.FC<SelectFieldPropertiesProps> = ({
  field,
  onUpdate,
}) => {
  // State to handle the raw textarea input
  const [optionsText, setOptionsText] = useState("");

  // Initialize textarea content from field options
  useEffect(() => {
    const properties = field.properties as ISelectFieldProperties;
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
      .filter((line) => line.trim()) // Remove empty line
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

  return (
    <>
      <Accordion title="Options" defaultExpanded={true}>
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
      </Accordion>
    </>
  );
};

export default SelectFieldProperties;
