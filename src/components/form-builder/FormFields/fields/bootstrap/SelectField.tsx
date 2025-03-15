import React, { useState } from "react";
import { SelectFieldProperties } from "../../../../../models/form/FieldProperties";
import { BaseFieldProps } from "../types";
import { getInputClasse } from "../../utils/fieldStyles";
import BootstrapWrapper from "../../wrappers/BoostrapWrapper";
import FieldFeedback from "../../components/FieldFeedback";

const SelectField: React.FC<BaseFieldProps> = ({
  field,
  properties,
  mode,
  layout,
  onChange,
  error,
}) => {
  const selectProperties = properties as SelectFieldProperties;

  const [value, setValue] = useState(selectProperties.defaultValue || "");
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };
  const selectInput = (
    <>
      <select
        id={field.fieldId}
        className={getInputClasse(selectProperties, error, layout)}
        disabled={selectProperties.disabled}
        value={value}
        onChange={handleChange}
      >
        <option value="">Select an option</option>
        {selectProperties.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <FieldFeedback
        primaryHelperText={selectProperties.helperText}
        error={error}
        mode={mode}
      />
    </>
  );
  return (
    <BootstrapWrapper field={field} mode={mode!} layout={layout}>
      {selectInput}
    </BootstrapWrapper>
  );
};

export default SelectField;
