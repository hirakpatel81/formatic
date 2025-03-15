export const AUTH_MESSAGES = {
  ERRORS: {
    NETWORK:
      "Connection failed. Please check your internet connection and try again.",
    INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
    SIGNUP_EMAIL_EXISTS: "An account with this email already exists.",
    DEFAULT: "Something went wrong. Please try again later.",
    EMAIL_NOT_CONFIRMED: "Please verify your email address to continue.",
    DIFFERENT_PASSWORD:
      "Your new password must be different from the old password.",
    RATE_LIMIT: "Too many attempts. Please try again later.",
  },

  // Success messages
  SUCCESS: {
    SIGNUP:
      "Account created successfully! Please check your email for verification.",
    PASSWORD_RESET: "Password reset instructions have been sent to your email.",
    LOGOUT: "You have been successfully logged out.",
  },

  // Form validation messages
  VALIDATION: {
    NAME_REQUIRED: "Full name is required",
    EMAIL_REQUIRED: "Email address is required",
    INVALID_EMAIL: "Please enter a valid email address",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
    PASSWORD_REQUIREMENTS:
      "Password must contain at least one uppercase letter, lowercase letter, number and special character",
    TERMS_REQUIRED: "You must agree to the terms and conditions",
  },
} as const;

// You can add other message categories as needed
export const GENERAL_MESSAGES = {
  LOADING: "Loading...",
  SAVING: "Saving...",
  PROCESSING: "Processing...",
  NO_DATA: "No data available",
} as const;

export const FORM_MESSAGES = {
  SAVE_SUCCESS: "Form saved successfully",
  PUBLISH_SUCCESS: "Form published successfully",
  DELETE_CONFIRM: "Are you sure you want to delete this form?",
} as const;
