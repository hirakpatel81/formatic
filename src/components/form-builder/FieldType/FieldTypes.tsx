import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  CategoryStyle,
  FIELD_TYPES,
  FieldTypeDefinition,
  getAllCategories,
  getCategoryStyle,
  getFieldsByCategory,
} from "../../../models/form/FieldTypeConfig";
import Accordion from "../../common/Accordion";

interface FieldTypeProps {
  showHeader?: boolean;
}

function FieldTypes({ showHeader = true }: FieldTypeProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleDrag = (
    event: React.DragEvent,
    fieldType: FieldTypeDefinition,
    style: CategoryStyle
  ) => {
    const previewElement = document.createElement("div");
    previewElement.className = "card border border-primary rounded-2";
    previewElement.style.cssText = `cursor: grabbing;width:180px`;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body px-1";
    cardBody.style.cssText = `padding: 0.35rem 1rem`;
    const icon = document.createElement("i");
    icon.className = `${fieldType.icon} px-2`;

    const text = document.createElement("span");
    text.className = "ms-2";
    text.textContent = fieldType.label;

    cardBody.appendChild(icon);
    cardBody.appendChild(text);
    previewElement.appendChild(cardBody);
    document.body.appendChild(previewElement);

    // Calculate center position for drag image
    const rect = previewElement.getBoundingClientRect();

    event.dataTransfer.setData("field", JSON.stringify(fieldType));
    event.dataTransfer.setDragImage(
      previewElement,
      rect.width / 2,
      rect.height / 2
    );

    setTimeout(() => {
      document.body.removeChild(previewElement);
    }, 0);
  };
  const filterFields = useCallback(() => {
    if (!searchTerm) return FIELD_TYPES;

    const lowerSearch = searchTerm.toLowerCase();
    return FIELD_TYPES.filter(
      (field) =>
        field.label.toLowerCase().includes(lowerSearch) ||
        field.description.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  const filteredFieldsByCategory = useMemo(() => {
    return getAllCategories().map((category) => ({
      category,
      fields: getFieldsByCategory(category).filter((field) =>
        filterFields().includes(field)
      ),
      fieldsCount: getFieldsByCategory(category).filter((field) =>
        filterFields().includes(field)
      ).length,
    }));
  }, [filterFields]);

  return (
    <div className="d-flex flex-column h-100 border-end">
      <div className="d-flex flex-column p-2">
        {filteredFieldsByCategory.map(
          ({ category, fields, fieldsCount }, index: number) => {
            if (fieldsCount === 0) return null;
            return (
              <Accordion
                title={category}
                defaultExpanded={true}
                fullBorder
                key={category}
              >
                {fields.map((fieldType, index) => {
                  const style = getCategoryStyle(category);
                  return (
                    <div
                      key={index}
                      className="card border rounded-2 shadow-sm border-primary mb-2"
                      style={
                        {
                          cursor: "move",
                          transition: "all 0.2s ease",
                        } as React.CSSProperties
                      }
                      draggable="true"
                      onDragStart={(e) => handleDrag(e, fieldType, style)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <div className="card-body d-flex align-items-center p-2">
                        <i className={`${fieldType.icon}  me-2`}></i>
                        <span className="fw-medium">{fieldType.label}</span>
                      </div>
                    </div>
                  );
                })}
              </Accordion>
            );
          }
        )}
      </div>
    </div>
  );
}

export default FieldTypes;
