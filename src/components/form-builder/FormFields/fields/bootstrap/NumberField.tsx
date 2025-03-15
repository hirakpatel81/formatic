import React, { useEffect, useState } from "react";
import { NumberFieldProperties } from "../../../../../models/form/FieldProperties";
import { BaseFieldProps } from "../types";
import { getInputClasse } from "../../utils/fieldStyles";
import BootstrapWrapper from "../../wrappers/BoostrapWrapper";
import FieldFeedback from "../../components/FieldFeedback";

const NumberField: React.FC<BaseFieldProps> = ({
  field,
  properties,
  mode,
  layout,
  onChange,
  error,
}) => {
  const numberProperties = properties as NumberFieldProperties;
  const [value, setValue] = useState(numberProperties.defaultValue || "");
  useEffect(() => {
    if (numberProperties.defaultValue !== undefined) {
      setValue(numberProperties.defaultValue);
    }
  }, [numberProperties.defaultValue]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };
  const numberInput = (
    <>
      <input
        id={field.fieldId}
        type="number"
        className={getInputClasse(numberProperties, error, layout)}
        value={value}
        onChange={handleChange}
        placeholder={numberProperties.placeholder}
        disabled={numberProperties.disabled}
        readOnly={numberProperties.readOnly}
        hidden={numberProperties.hidden}
        step={numberProperties.step}
      />
      <FieldFeedback
        primaryHelperText={numberProperties.helperText}
        error={error}
        mode={mode}
      />
    </>
  );
  return (
    <BootstrapWrapper field={field} mode={mode!} layout={layout}>
      {numberInput}
    </BootstrapWrapper>
  );
};
export default NumberField;
