import { FieldType } from "./FieldType";

export interface FieldTypeConfig {
  id: string;
  label: string;
  icon: string;
  type: string;
  category?: FieldCategory;
  description?: string;
}

/**
 * Categories for organizing field types in the panel.
 * Each category represents a logical grouping of related field types.
 */
export enum FieldCategory {
  BASIC_INPUT = "Basic Input", // Text, number, etc.
  CHOICE = "Choice", // Dropdowns, radios, checkboxes
  DATE_TIME = "Date & Time", // Date, time, datetime pickers
  LAYOUT = "Layout & Structure", // Structural elements like headings
}

/**
 * Configuration for visual styling of field categories
 */
export interface CategoryStyle {
  icon: string; // Font Awesome icon class
  color: {
    primary: string; // Main category color
    background: string; // Background color for items
    hover: string; // Color for hover state
    border: string; // Border color
  };
}

/**
 * Configuration for a field type that appears in the panel
 */
export interface FieldTypeDefinition {
  type: FieldType; // The actual field type
  label: string; // Display label in the panel
  placeHolder?: string;
  icon: string; // Font Awesome icon class
  description: string; // Tooltip/helper text
  category: FieldCategory; // Which category it belongs to
  defaultLabel: string; // Default label when added to form
  premium?: boolean; // Whether this is a premium feature
}

/**
 * Styling configuration for each category
 */
export const CATEGORY_STYLES: Record<FieldCategory, CategoryStyle> = {
  [FieldCategory.BASIC_INPUT]: {
    icon: "fa-solid fa-text-width",
    color: {
      primary: "#3B82F6", // Blue
      background: "#EFF6FF",
      hover: "#DBEAFE",
      border: "#BFDBFE",
    },
  },
  [FieldCategory.CHOICE]: {
    icon: "fa-solid fa-list-check",
    color: {
      primary: "#8B5CF6", // Purple
      background: "#F5F3FF",
      hover: "#EDE9FE",
      border: "#DDD6FE",
    },
  },
  [FieldCategory.DATE_TIME]: {
    icon: "fa-solid fa-calendar-days",
    color: {
      primary: "#10B981", // Green
      background: "#ECFDF5",
      hover: "#D1FAE5",
      border: "#A7F3D0",
    },
  },
  [FieldCategory.LAYOUT]: {
    icon: "fa-solid fa-layer-group",
    color: {
      primary: "#6B7280", // Gray
      background: "#F9FAFB",
      hover: "#F3F4F6",
      border: "#E5E7EB",
    },
  },
};
/**
 * Complete field type configurations
 */
export const FIELD_TYPES: FieldTypeDefinition[] = [
  // Basic Input Fields
  {
    type: FieldType.TEXT,
    label: "Text Field",
    icon: "fa-solid fa-font",
    description: "Single line text input for short answers",
    category: FieldCategory.BASIC_INPUT,
    defaultLabel: "Text Field",
    placeHolder: "Please enter your text",
  },
  {
    type: FieldType.TEXTAREA,
    label: "Text Area",
    icon: "fa-solid fa-align-left",
    description: "Multi-line text input for longer answers",
    category: FieldCategory.BASIC_INPUT,
    defaultLabel: "Text Area",
  },
  {
    type: FieldType.NUMBER,
    label: "Number",
    icon: "fa-solid fa-hashtag",
    description: "Numeric input with optional constraints",
    category: FieldCategory.BASIC_INPUT,
    defaultLabel: "Number",
  },
  {
    type: FieldType.EMAIL,
    label: "Email",
    icon: "fa-solid fa-envelope",
    description: "Email",
    category: FieldCategory.BASIC_INPUT,
    defaultLabel: "Email",
  },
  {
    type: FieldType.PASSWORD,
    label: "Password",
    icon: "fa-solid fa-lock",
    description: "Secure password input field",
    category: FieldCategory.BASIC_INPUT,
    defaultLabel: "Password",
  },

  // Choice Fields
  {
    type: FieldType.SELECT,
    label: "Dropdown",
    icon: "fa-solid fa-caret-down",
    description: "Single selection from a dropdown list",
    category: FieldCategory.BASIC_INPUT,
    defaultLabel: "Select Option",
  },
  {
    type: FieldType.RADIO,
    label: "Radio",
    icon: "fa-solid fa-circle-dot",
    description: "Single selection from visible options",
    category: FieldCategory.BASIC_INPUT,
    defaultLabel: "Choose One",
  },
  {
    type: FieldType.CHECKBOX,
    label: "Checkbox",
    icon: "fa-solid fa-square-check",
    description: "Multiple selection checkboxes",
    category: FieldCategory.BASIC_INPUT,
    defaultLabel: "Checkbox Options",
  },
  {
    type: FieldType.BUTTON,
    label: "Button",
    icon: "fa-solid fa-mobile-button",
    description: "Button",
    category: FieldCategory.BASIC_INPUT,
    defaultLabel: "My Button",
  },
];

/**
 * Helper functions for working with field types
 */
export function getFieldsByCategory(
  category: FieldCategory
): FieldTypeDefinition[] {
  return FIELD_TYPES.filter((field) => field.category === category);
}

export function getAllCategories(): FieldCategory[] {
  return Object.values(FieldCategory);
}

export function getCategoryStyle(category: FieldCategory): CategoryStyle {
  return CATEGORY_STYLES[category];
}

export function getFieldDefinition(
  type: FieldType
): FieldTypeDefinition | undefined {
  return FIELD_TYPES.find((field) => field.type === type);
}
