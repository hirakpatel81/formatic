import React, { CSSProperties, useEffect, useState } from "react";
import { TextAreaFieldProperties } from "../../../../../models/form/FieldProperties";
import { BaseFieldProps } from "../types";
import { getInputClasse } from "../../utils/fieldStyles";
import BootstrapWrapper from "../../wrappers/BoostrapWrapper";
import FieldFeedback from "../../components/FieldFeedback";

const TextAreaField: React.FC<BaseFieldProps> = ({
  field,
  properties,
  mode,
  layout,
  onChange,
  error,
}) => {
  const textAreaProperties = properties as TextAreaFieldProperties;
  const [value, setValue] = useState(textAreaProperties.defaultValue || "");

  const textareaStyle: CSSProperties = {
    resize: textAreaProperties.resize ? "both" : ("none" as const),
  };
  useEffect(() => {
    if (textAreaProperties.defaultValue !== undefined) {
      setValue(textAreaProperties.defaultValue);
    }
  }, [textAreaProperties.defaultValue]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };
  const textAreaInput = (
    <>
      <textarea
        id={field.fieldId}
        className={getInputClasse(textAreaProperties, error, layout)}
        placeholder={textAreaProperties.placeholder}
        value={value}
        onChange={handleChange}
        disabled={textAreaProperties.disabled}
        readOnly={textAreaProperties.readOnly}
        hidden={textAreaProperties.hidden}
        rows={textAreaProperties.rows}
        spellCheck={textAreaProperties.spellcheck}
        autoFocus={textAreaProperties.autofocus}
        style={textareaStyle}
      />
      <FieldFeedback
        primaryHelperText={textAreaProperties.helperText}
        error={error}
        mode={mode ?? "builder"}
      />
    </>
  );
  return (
    <BootstrapWrapper field={field} mode={mode!} layout={layout}>
      {textAreaInput}
    </BootstrapWrapper>
  );
};

export default TextAreaField;
