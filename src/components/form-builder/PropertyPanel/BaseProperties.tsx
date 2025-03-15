import React from "react";
import { FormField } from "../../../models/form/FormField";
import Accordion from "../../common/Accordion";
import Switch from "../../common/Switch/Switch";
import { FieldType } from "../../../models/form/FieldType";
import {
  CheckboxFieldProperties,
  NumberFieldProperties,
  RadioFieldProperties,
  TextAreaFieldProperties,
} from "../../../models/form/FieldProperties";
import Checkbox from "../../common/Checkbox/Checkbox";
import { FieldService } from "../../../services/FieldService";
import { IdGenerationService } from "../../../services/IdGenerationService";
import ValidationProperties from "./ValidationProperties";

interface BasePropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const BaseProperties: React.FC<BasePropertiesProps> = ({ field, onUpdate }) => {
  const isTextAreaProperties = (
    field: FormField
  ): field is FormField & { properties: TextAreaFieldProperties } => {
    return field.type === FieldType.TEXTAREA;
  };
  const isChoiceProperties = (
    field: FormField
  ): field is FormField & {
    properties: RadioFieldProperties | CheckboxFieldProperties;
  } => {
    return field.type === FieldType.RADIO || field.type === FieldType.CHECKBOX;
  };
  const isNumberProperties = (
    field: FormField
  ): field is FormField & { properties: NumberFieldProperties } => {
    return field.type === FieldType.NUMBER;
  };
  const isChoiceField =
    field.type === FieldType.RADIO || field.type === FieldType.CHECKBOX;

  const shouldShowProperty = (propertyName: string) => {
    const hiddenPropertiesByType = {
      [FieldType.SELECT]: [
        "placeholder",
        "readOnly",
        "autofocus",
        "spellcheck",
        "autocomplete",
      ],
      [FieldType.RADIO]: [
        "placeholder",
        "readOnly",
        "defaultValue",
        "autofocus",
        "spellcheck",
        "autocomplete",
        "helperText",
      ],
      [FieldType.CHECKBOX]: [
        "placeholder",
        "readOnly",
        "defaultValue",
        "autofocus",
        "spellcheck",
        "autocomplete",
        "helperText",
      ],
      [FieldType.EMAIL]: ["spellcheck"],
    };

    const hiddenProperties =
      hiddenPropertiesByType[field.type as keyof typeof hiddenPropertiesByType];
    if (hiddenProperties) {
      return !hiddenProperties.includes(propertyName);
    }

    return true;
  };
  const handleBasePropertyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onUpdate({
      ...field,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for properties within the properties object
  const handleFieldPropertyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value: any;

    if (e.target.type === "number") {
      value = e.target.value ? Number(e.target.value) : undefined;
    } else if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        [e.target.name]: value,
      },
    });
  };
  const handleSwitchChange =
    (propertyName: string, isDirectField: boolean = false) =>
    (checked: boolean) => {
      if (isDirectField) {
        onUpdate({
          ...field,
          [propertyName]: checked,
        });
      } else {
        onUpdate({
          ...field,
          properties: {
            ...field.properties,
            [propertyName]: checked,
          },
        });
      }
    };
  const handleWidthChange = (checked: boolean) => {
    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        width: checked ? "full" : "half",
      },
    });
  };
  const getCurrentRows = () => {
    if (isTextAreaProperties(field)) {
      return field.properties.rows || 3;
    }
    return 3;
  };
  const getCurrentStep = () => {
    if (isNumberProperties(field)) {
      return field.properties.step || 1;
    }
    return 1;
  };
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    const newId = IdGenerationService.generateFieldId(newLabel);

    onUpdate({
      ...field,
      label: newLabel,
      fieldId: newId,
    });
  };

  return (
    <>
      <Accordion title="General" defaultExpanded={true}>
        <div className="mb-3">
          <label className="form-label">Label</label>
          <input
            type="text"
            className="form-control formatic-form-control"
            name="label"
            value={field.label}
            onChange={handleLabelChange}
          />
        </div>

        {/* <div className="mb-3">
          <Switch
            label="Required"
            checked={field.required}
            onChange={handleSwitchChange("required", true)}
          />
        </div> */}

        {shouldShowProperty("placeholder") && (
          <div className="mb-3">
            <label className="form-label">Placeholder</label>
            <input
              type="text"
              className="form-control formatic-form-control"
              name="placeholder"
              value={field.properties.placeholder || ""}
              onChange={handleFieldPropertyChange}
            />
          </div>
        )}

        {shouldShowProperty("helperText") && (
          <div className="mb-3">
            <label className="form-label">Helper Text</label>
            <input
              type="text"
              className="form-control formatic-form-control"
              name="helperText"
              value={field.properties.helperText || ""}
              onChange={handleFieldPropertyChange}
              placeholder="Help text below the field"
            />
          </div>
        )}

        {shouldShowProperty("defaultValue") && (
          <div className="mb-3">
            <label className="form-label">Default Value</label>
            <input
              type="text"
              className="form-control formatic-form-control"
              name="defaultValue"
              value={field.properties.defaultValue || ""}
              onChange={handleFieldPropertyChange}
            />
          </div>
        )}
        {field.type === FieldType.NUMBER && (
          <div className="mb-3">
            <label className="form-label">Step</label>
            <input
              type="number"
              className="form-control formatic-form-control"
              name="step"
              value={getCurrentStep()}
              onChange={handleFieldPropertyChange}
              min={0}
              step="any"
            />
            <small className="form-text text-muted">
              The increment/decrement step for the number input
            </small>
          </div>
        )}
      </Accordion>

      {/* Appearance & Layout */}
      <Accordion title="Appearance & Layout">
        <div className="mb-3">
          <Switch
            label="Full Width"
            checked={field.properties.width === "full"}
            onChange={handleWidthChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Field Size</label>
          <select
            className="form-select formatic-form-select"
            name="size"
            value={field.properties.size || "medium"}
            onChange={handleFieldPropertyChange}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {field.type === FieldType.TEXTAREA && (
          <div className="mb-3">
            <label className="form-label">Rows</label>
            <input
              type="number"
              className="form-control formatic-form-control"
              name="rows"
              value={getCurrentRows()}
              onChange={handleFieldPropertyChange}
              min={1}
              max={20}
            />
          </div>
        )}

        {isChoiceField && (
          <div className="mb-3">
            <Switch
              label="Display Inline"
              checked={
                (isChoiceProperties(field) && field.properties.displayInline) ||
                false
              }
              onChange={handleSwitchChange("displayInline")}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">CSS Class</label>
          <input
            type="text"
            className="form-control formatic-form-control"
            name="className"
            value={field.properties.className || ""}
            onChange={handleFieldPropertyChange}
          />
        </div>
      </Accordion>

      {/* Behavior */}
      <Accordion title="Behavior">
        <div className="mb-3">
          <Switch
            label="Hidden"
            checked={field.properties.hidden || false}
            onChange={handleSwitchChange("hidden")}
          />
        </div>

        <div className="mb-3">
          <Switch
            label="Disabled"
            checked={field.properties.disabled || false}
            onChange={handleSwitchChange("disabled")}
          />
        </div>

        {shouldShowProperty("readOnly") && (
          <div className="mb-3">
            <Switch
              label="Read Only"
              checked={field.properties.readOnly || false}
              onChange={handleSwitchChange("readOnly")}
            />
          </div>
        )}

        {shouldShowProperty("autofocus") && (
          <div className="mb-3">
            <Switch
              label="Auto Focus"
              checked={field.properties.autofocus || false}
              onChange={handleSwitchChange("autofocus")}
            />
          </div>
        )}

        {shouldShowProperty("autocomplete") && (
          <div className="mb-3">
            <Switch
              label="Auto Complete"
              checked={field.properties.autocomplete || false}
              onChange={handleSwitchChange("autocomplete")}
            />
          </div>
        )}

        {shouldShowProperty("spellcheck") && (
          <div className="mb-3">
            <Switch
              label="Spell Check"
              checked={field.properties.spellcheck || false}
              onChange={handleSwitchChange("spellcheck")}
            />
          </div>
        )}

        {field.type === FieldType.TEXTAREA && (
          <div className="mb-3">
            <Switch
              label="Allow Resize"
              checked={
                isTextAreaProperties(field) &&
                (field.properties.resize || false)
              }
              onChange={handleSwitchChange("resize")}
            />
            <small className="form-text text-muted d-block mt-1">
              Let users resize the textarea
            </small>
          </div>
        )}
      </Accordion>
      <ValidationProperties field={field} onUpdate={onUpdate} />
    </>
  );
};

export default BaseProperties;
