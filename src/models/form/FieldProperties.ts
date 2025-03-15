import { BaseFieldProperties } from "./BaseFieldProperties";

// Interface for options in choice-based fields
export interface ChoiceOption {
  label: string;
  value: string;
}

// Text field specific properties
export interface TextFieldProperties extends BaseFieldProperties {}

// Textarea field specific properties
export interface TextAreaFieldProperties extends BaseFieldProperties {
  rows?: number;
  resize?: boolean;
}

// Number field specific properties
export interface NumberFieldProperties extends BaseFieldProperties {
  step?: number;
}
export interface PasswordFieldProperties extends BaseFieldProperties {
  togglePasswordVisibility?: boolean;
  confirmPassword?: boolean;
}
export interface EmailFieldProperties extends BaseFieldProperties {
  confirmEmail?: boolean;
}
// Select field specific properties
export interface SelectFieldProperties extends BaseFieldProperties {
  options: ChoiceOption[];
}

// Radio field specific properties
export interface RadioFieldProperties extends BaseFieldProperties {
  options: ChoiceOption[];
  displayInline?: boolean;
}

// Checkbox field specific properties
export interface CheckboxFieldProperties extends BaseFieldProperties {
  options: ChoiceOption[];
  checked?: boolean;
  label?: string;
  displayInline?: boolean;
}
export interface ButtonFieldProperties extends BaseFieldProperties {
  buttonType: "submit" | "button" | "reset";
  buttonStyle: "primary" | "secondary" | "outline";
  buttonIcon?: string;
}

// This union type encompasses all possible field property types
export type FieldProperties =
  | TextFieldProperties
  | TextAreaFieldProperties
  | NumberFieldProperties
  | PasswordFieldProperties
  | EmailFieldProperties
  | SelectFieldProperties
  | RadioFieldProperties
  | CheckboxFieldProperties
  | ButtonFieldProperties;
