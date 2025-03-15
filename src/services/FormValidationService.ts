import { FormField } from "../models/form/FormField";
import { ValidationRule, ValidationTypes } from "../models/form/ValidationRule";
import { validateEmail } from "../components/form-builder/FormFields/utils/emailUtils";

/**
 * This class is used to show validation during the Preview mode
 */
export class FormValidationService {
  static validateForm(
    fields: FormField[],
    formData: Record<string, any>
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    fields.forEach((field) => {
      // Process each validation rule in order
      for (const validation of field.validations) {
        const error = this.processValidation(
          validation,
          formData[field.fieldId]
        );
        if (error) {
          errors[field.fieldId] = error;
          break;
        }
      }
    });

    return errors;
  }

  private static processValidation(
    validation: ValidationRule,
    value: any
  ): string | null {
    // Handle empty values for required validation
    if (validation.type === ValidationTypes.REQUIRED) {
      if (!value || value.toString().trim() === "") {
        return validation.message;
      }
      return null;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === "") {
      return null;
    }

    switch (validation.type) {
      case ValidationTypes.MIN_LENGTH:
        if (validation.params?.min && value.length < validation.params.min) {
          return validation.message.replace(
            "{min}",
            validation.params.min.toString()
          );
        }
        break;

      case ValidationTypes.MAX_LENGTH:
        if (validation.params?.max && value.length > validation.params.max) {
          return validation.message.replace(
            "{max}",
            validation.params.max.toString()
          );
        }
        break;

      case ValidationTypes.PATTERN:
        if (validation.params?.pattern) {
          const regex = new RegExp(validation.params.pattern);
          if (!regex.test(value)) {
            return validation.message;
          }
        }
        break;

      case ValidationTypes.EMAIL:
        const emailToValidate =
          typeof value === "object" && "email" in value ? value.email : value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailToValidate)) {
          return validation.message;
        }
        break;

      case ValidationTypes.EMAIL_DOMAIN:
        if (validation.params?.allowedDomains?.length) {
          const emailValue =
            typeof value === "object" && "email" in value ? value.email : value;
          const domain = emailValue.split("@")[1]?.toLowerCase();
          if (
            !validation.params.allowedDomains.some(
              (d) => d.toLowerCase() === domain
            )
          ) {
            return validation.message;
          }
        }
        break;

      case ValidationTypes.MATCH:
        if (typeof value === "object") {
          if ("email" in value && "confirmEmail" in value) {
            if (value.email !== value.confirmEmail) {
              return validation.message;
            }
          } else if ("password" in value && "confirmPassword" in value) {
            if (value.password !== value.confirmPassword) {
              return validation.message;
            }
          }
        }
        break;

      case ValidationTypes.PASSWORD_UPPERCASE:
        if (!/[A-Z]/.test(value.password)) {
          return validation.message;
        }
        break;

      case ValidationTypes.PASSWORD_LOWERCASE:
        if (!/[a-z]/.test(value.password)) {
          return validation.message;
        }
        break;

      case ValidationTypes.PASSWORD_NUMBER:
        if (!/[0-9]/.test(value.password)) {
          return validation.message;
        }
        break;

      case ValidationTypes.PASSWORD_SPECIAL:
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value.password)) {
          return validation.message;
        }
        break;

      case ValidationTypes.MIN:
        if (validation.params?.min && Number(value) < validation.params.min) {
          return validation.message.replace(
            "{min}",
            validation.params.min.toString()
          );
        }
        break;

      case ValidationTypes.MAX:
        if (validation.params?.max && Number(value) > validation.params.max) {
          return validation.message.replace(
            "{max}",
            validation.params.max.toString()
          );
        }
        break;

      case ValidationTypes.EMAIL_DOMAIN:
        if (validation.params?.allowedDomains?.length) {
          const domain = value.split("@")[1]?.toLowerCase();
          if (!validation.params.allowedDomains.includes(domain)) {
            return validation.message;
          }
        }
        break;

      case ValidationTypes.EMAIL_DISPOSABLE:
        if (validation.params?.preventDisposable) {
          const emailValidation = validateEmail(value, {
            preventDisposable: true,
          });
          if (!emailValidation.isValid) {
            return validation.message;
          }
        }
        break;
    }

    return null;
  }
}
