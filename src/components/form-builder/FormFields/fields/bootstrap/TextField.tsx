import { useEffect, useState } from "react";
import { TextFieldProperties } from "../../../../../models/form/FieldProperties";
import BootstrapWrapper from "../../wrappers/BoostrapWrapper";
import { getInputClasse } from "../../utils/fieldStyles";

import FieldFeedback from "../../components/FieldFeedback";
import { BaseFieldProps } from "../types";

const TextField: React.FC<BaseFieldProps> = ({
  field,
  properties,
  mode,
  layout,
  onChange,
  error,
}) => {
  const textProperties = properties as TextFieldProperties;
  const [value, setValue] = useState(textProperties.defaultValue || "");

  useEffect(() => {
    if (textProperties.defaultValue !== undefined) {
      setValue(textProperties.defaultValue);
    }
  }, [textProperties.defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const inputElement = (
    <>
      <input
        id={field.fieldId}
        type="text"
        className={getInputClasse(textProperties, error, layout)}
        value={value}
        onChange={handleChange}
        placeholder={textProperties.placeholder}
        disabled={textProperties.disabled}
        readOnly={textProperties.readOnly}
        hidden={textProperties.hidden}
        autoComplete={textProperties.autocomplete ? "on" : "off"}
        spellCheck={textProperties.spellcheck}
        autoFocus={textProperties.autofocus}
      />
      <FieldFeedback
        primaryHelperText={textProperties.helperText}
        error={error}
        mode={mode}
      />
    </>
  );

  return (
    <BootstrapWrapper field={field} mode={mode!} layout={layout}>
      {inputElement}
    </BootstrapWrapper>
  );
};

export default TextField;
