import React from "react";
import { FormField } from "../../../models/form/FormField";
import { FieldType } from "../../../models/form/FieldType";
import BaseProperties from "./BaseProperties";

import PasswordFieldProperties from "./field-porperties/PasswordFieldProperties";
import EmailFieldProperties from "./field-porperties/EmailFieldProperties";
import ButtonFieldProperties from "./field-porperties/ButtonFieldProperties";
import "./PropertyPanel.css";
import SelectFieldProperties from "./field-porperties/SelectFieldProperties";
import RadioFieldProperties from "./field-porperties/RadioFieldProperties";
import CheckboxFieldProperties from "./field-porperties/CheckboxFieldProperties";
interface PropertyPanelProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onClose: () => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  field,
  onUpdate,
  onClose,
}) => {
  // Render field-specific properties based on field type
  const renderFieldTypeProperties = () => {
    switch (field.type) {
      case FieldType.TEXT:
      case FieldType.TEXTAREA:
      case FieldType.NUMBER:
        return null;
      case FieldType.SELECT:
        return <SelectFieldProperties field={field} onUpdate={onUpdate} />;
      case FieldType.RADIO:
        return <RadioFieldProperties field={field} onUpdate={onUpdate} />;
      case FieldType.CHECKBOX:
        return <CheckboxFieldProperties field={field} onUpdate={onUpdate} />;

      case FieldType.PASSWORD:
        return <PasswordFieldProperties field={field} onUpdate={onUpdate} />;
      case FieldType.EMAIL:
        return <EmailFieldProperties field={field} onUpdate={onUpdate} />;
      case FieldType.BUTTON:
        return <ButtonFieldProperties field={field} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="border-left">
      <div className="property-panel border-left open">
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Field Properties</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="accordion accordion-flush">
          {field.type !== FieldType.BUTTON && (
            <BaseProperties field={field} onUpdate={onUpdate} />
          )}

          {/* Field-specific properties */}
          {renderFieldTypeProperties()}
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;
