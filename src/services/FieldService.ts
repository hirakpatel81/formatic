import { FormField } from "../models/form/FormField";
import { FieldTypeDefinition } from "../models/form/FieldTypeConfig";
import { FieldType } from "../models/form/FieldType";
import {
  FieldProperties,
  TextFieldProperties,
  TextAreaFieldProperties,
  NumberFieldProperties,
  SelectFieldProperties,
  RadioFieldProperties,
  CheckboxFieldProperties,
  PasswordFieldProperties,
  ButtonFieldProperties,
} from "../models/form/FieldProperties";
import { BaseFieldProperties } from "../models/form/BaseFieldProperties";
import { IdGenerationService } from "./IdGenerationService";

export class FieldService {
  /**
   * Creates a FormField from a FieldTypeDefinition, setting up the appropriate
   * properties based on the field type.
   */
  static createFormField(
    fieldType: FieldTypeDefinition,
    order: number
  ): FormField {
    // Create the appropriate properties based on field type
    const properties: FieldProperties = this.createPropertiesForType(
      fieldType.type
    );
    const fieldId = IdGenerationService.generateFieldId(fieldType.defaultLabel);
    return {
      fieldId: fieldId,
      type: fieldType.type,
      label: `${fieldType.defaultLabel}`,
      required: false,
      properties,
      validations: [],
      order,
    };
  }

  /**
   * Creates the appropriate properties object for a given field type,
   * ensuring type safety and proper property initialization.
   */
  private static createPropertiesForType(type: FieldType): FieldProperties {
    // Common base properties that all field types share
    const baseProps: BaseFieldProperties = {
      placeholder: "",
      helperText: "",
      defaultValue: "",

      hidden: false,
      className: "",
      width: "full" as const,
      disabled: false,
      readOnly: false,
      size: "medium" as const,
      autofocus: false,
      spellcheck: false,
    };

    switch (type) {
      case FieldType.TEXT:
        return {
          ...baseProps,
          minLength: undefined,
          maxLength: undefined,
          pattern: undefined,
        } as TextFieldProperties;

      case FieldType.TEXTAREA:
        return {
          ...baseProps,
          rows: 3,
          minLength: undefined,
          maxLength: undefined,
          resize: false,
        } as TextAreaFieldProperties;

      case FieldType.NUMBER:
        return {
          ...baseProps,
          min: undefined,
          max: undefined,
          step: 1,
        } as NumberFieldProperties;
      case FieldType.PASSWORD:
        return {
          ...baseProps,
        } as PasswordFieldProperties;

      case FieldType.SELECT:
        return {
          ...baseProps,
          options: [],
          multiple: false,
          searchable: false,
        } as SelectFieldProperties;

      case FieldType.RADIO:
        return {
          ...baseProps,
          options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ],
          displayInline: false,
        } as RadioFieldProperties;

      case FieldType.CHECKBOX:
        return {
          ...baseProps,
          checked: false,
          label: "",
          options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ],
          displayInline: false,
          defaultValue: [],
        } as CheckboxFieldProperties;
      case FieldType.BUTTON:
        return {
          ...baseProps,
          buttonStyle: "primary",
          buttonType: "submit",
          width: "half",
        } as ButtonFieldProperties;
      default:
        return { ...baseProps } as TextFieldProperties;
    }
  }
}
