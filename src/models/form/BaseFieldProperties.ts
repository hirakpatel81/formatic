/**
 * BaseFieldProperties defines the common properties that all form fields share.
 * This serves as the foundation for more specific field type properties.
 */
export interface BaseFieldProperties {
  // Display properties
  placeholder?: string; // Placeholder text shown when field is empty
  helperText?: string; // Helper text shown below the field

  // Value handling
  defaultValue?: any; // Default value for the field

  // Visual properties
  hidden?: boolean; // Whether the field should be hidden
  className?: string; // Custom CSS classes

  // Layout properties
  width?: "full" | "half" | "third";

  // Behavior properties
  disabled?: boolean; // Whether the field is disabled
  readOnly?: boolean; // Whether the field is read-only
  size?: "small" | "medium" | "large"; // For the size error
  autofocus?: boolean; // For the autofocus error
  spellcheck?: boolean; // For spellcheck functionality
  autocomplete?: boolean; // For autocomplete functionality
}
