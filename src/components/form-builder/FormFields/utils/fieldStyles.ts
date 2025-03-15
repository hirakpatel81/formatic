import { FieldProperties } from "../../../../models/form/FieldProperties";
import { BaseFieldProperties } from "../../../../models/form/BaseFieldProperties";

export const hasProperty = <T extends FieldProperties>(
  properties: T,
  key: keyof BaseFieldProperties
): boolean => {
  return key in properties;
};

export const getInputClasse = (
  properties: FieldProperties,
  error: any,
  layout?: string
) => {
  let classes = ["form-control"];

  if (layout === "horizontal") {
    classes.push("col-sm-9");
  }

  if (properties.size) {
    classes.push(`form-control-${properties.size}`);
  }

  if (properties.width) {
    switch (properties.width) {
      case "half":
        classes.push("w-50");
        break;
      case "third":
        classes.push("w-33");
        break;
      case "full":
      default:
        classes.push("w-100");
        break;
    }
  }

  if (error) {
    classes.push("is-invalid");
  }

  return classes.join(" ");
};
