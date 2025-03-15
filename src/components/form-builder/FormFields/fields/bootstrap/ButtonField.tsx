import { ButtonFieldProperties } from "../../../../../models/form/FieldProperties";
import { BaseFieldProps } from "../types";

const ButtonField: React.FC<BaseFieldProps> = ({ field, properties }) => {
  const buttonProperties = properties as ButtonFieldProperties;

  const buttonClasses = ["btn"];

  switch (buttonProperties.buttonStyle) {
    case "primary":
      buttonClasses.push("btn-primary");
      break;
    case "secondary":
      buttonClasses.push("btn-secondary");
      break;
    case "outline":
      buttonClasses.push("btn-outline-primary");
      break;
  }

  if (buttonProperties.size) {
    switch (buttonProperties.size) {
      case "small":
        buttonClasses.push("btn-sm");
        break;
      case "large":
        buttonClasses.push("btn-lg");
        break;
    }
  }

  if (buttonProperties.width) {
    switch (buttonProperties.width) {
      case "half":
        buttonClasses.push("w-50");
        break;
      case "third":
        buttonClasses.push("w-33");
        break;
      case "full":
      default:
        buttonClasses.push("w-100");
        break;
    }
  }

  return (
    <button
      id={field.fieldId}
      type={buttonProperties.buttonType}
      className={buttonClasses.join(" ")}
      disabled={field.properties.disabled}
    >
      {buttonProperties.buttonIcon && (
        <i className={`${buttonProperties.buttonIcon} me-2`}></i>
      )}
      {field.label}
    </button>
  );
};

export default ButtonField;
