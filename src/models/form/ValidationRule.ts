export const ValidationTypes = {
  REQUIRED: "required",
  MIN_LENGTH: "minLength",
  MAX_LENGTH: "maxLength",
  MIN: "min",
  MAX: "max",
  EMAIL: "email",
  URL: "url",
  PATTERN: "pattern",
  MATCH: "match", // For password confirmation
  CUSTOM: "custom", // For custom validation functions

  PASSWORD_UPPERCASE: "passwordUppercase",
  PASSWORD_LOWERCASE: "passwordLowercase",
  PASSWORD_NUMBER: "passwordNumber",
  PASSWORD_SPECIAL: "passwordSpecial",

  EMAIL_DOMAIN: "emailDomain", // For allowed domains
  EMAIL_DISPOSABLE: "emailDisposable", // Prevent disposable emails
} as const;

export type ValidationParams = {
  min?: number;
  max?: number; // For max length or max value
  pattern?: string; // For regex patterns
  matchField?: string; // For field matching (like password confirmation)
  custom?: (value: any) => boolean; // For custom validation functions

  allowedDomains?: string[]; // List of allowed email domains
  preventDisposable?: boolean; // Whether to block disposable email services
};

export type ValidationRuleType =
  (typeof ValidationTypes)[keyof typeof ValidationTypes];

export interface ValidationRule {
  type: ValidationRuleType;
  message: string;
  params?: ValidationParams;
}

export const DEFAULT_VALIDATION_MESSAGES: Record<ValidationRuleType, string> = {
  [ValidationTypes.REQUIRED]: "This field is required",
  [ValidationTypes.MIN_LENGTH]: "Must be at least {min} characters",
  [ValidationTypes.MAX_LENGTH]: "Must be at most {max} characters",
  [ValidationTypes.MIN]: "Must be at least {min}",
  [ValidationTypes.MAX]: "Must be at most {max}",
  [ValidationTypes.EMAIL]: "Please enter a valid email address",
  [ValidationTypes.URL]: "Please enter a valid URL",
  [ValidationTypes.PATTERN]: "Please match the requested format",
  [ValidationTypes.MATCH]: "Fields do not match",
  [ValidationTypes.CUSTOM]: "Invalid value",
  [ValidationTypes.PASSWORD_UPPERCASE]:
    "Must contain at least one uppercase letter",
  [ValidationTypes.PASSWORD_LOWERCASE]:
    "Must contain at least one lowercase letter",
  [ValidationTypes.PASSWORD_NUMBER]: "Must contain at least one number",
  [ValidationTypes.PASSWORD_SPECIAL]:
    "Must contain at least one special character",
  [ValidationTypes.EMAIL_DOMAIN]: "Email must be from an allowed domain",
  [ValidationTypes.EMAIL_DISPOSABLE]:
    "Disposable email addresses are not allowed",
};

export function createValidationRule(
  type: ValidationRuleType,
  message?: string,
  params?: ValidationParams
): ValidationRule {
  return {
    type,
    message: message || DEFAULT_VALIDATION_MESSAGES[type],
    params,
  };
}
