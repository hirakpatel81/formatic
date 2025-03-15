import { FieldType } from "./FieldType";
import { ValidationTypes } from "./ValidationRule";

export const FIELD_VALIDATIONS = {
  [FieldType.TEXT]: [
    ValidationTypes.REQUIRED,
    ValidationTypes.MIN_LENGTH,
    ValidationTypes.MAX_LENGTH,
    ValidationTypes.PATTERN,
  ],

  [FieldType.TEXTAREA]: [
    ValidationTypes.REQUIRED,
    ValidationTypes.MIN_LENGTH,
    ValidationTypes.MAX_LENGTH,
  ],

  [FieldType.NUMBER]: [
    ValidationTypes.REQUIRED,
    ValidationTypes.MIN,
    ValidationTypes.MAX,
  ],

  [FieldType.PASSWORD]: [
    ValidationTypes.REQUIRED,
    ValidationTypes.MIN_LENGTH,
    ValidationTypes.PASSWORD_UPPERCASE,
    ValidationTypes.PASSWORD_LOWERCASE,
    ValidationTypes.PASSWORD_NUMBER,
    ValidationTypes.PASSWORD_SPECIAL,
    ValidationTypes.MATCH,
  ],

  [FieldType.EMAIL]: [
    ValidationTypes.REQUIRED,
    ValidationTypes.EMAIL, // Basic email format
    ValidationTypes.EMAIL_DOMAIN, // Domain restrictions
    ValidationTypes.EMAIL_DISPOSABLE, // Disposable email check
    ValidationTypes.MATCH, // For email confirmation
  ],

  [FieldType.SELECT]: [ValidationTypes.REQUIRED],

  [FieldType.RADIO]: [ValidationTypes.REQUIRED],

  [FieldType.CHECKBOX]: [ValidationTypes.REQUIRED],

  [FieldType.BUTTON]: [], // Buttons don't have validations
} as const;

// Type to get available validations for a field type
export type AvailableValidations<T extends FieldType> =
  (typeof FIELD_VALIDATIONS)[T];
