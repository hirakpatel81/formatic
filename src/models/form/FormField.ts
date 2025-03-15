import { FieldProperties } from "./FieldProperties";
import { FieldType } from "./FieldType";
import { ValidationRule } from "./ValidationRule";

export interface FormField {
  fieldId: string;
  type: FieldType;
  label: string;
  required: boolean;
  properties: FieldProperties;
  validations: ValidationRule[];
  order: number;
}
