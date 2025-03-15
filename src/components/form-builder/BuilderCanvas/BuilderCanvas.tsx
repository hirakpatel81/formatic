import React, { useState, useRef } from "react";

import PropertyPanel from "../PropertyPanel/PropertyPanel";
import FormFieldRenderer from "../FormFields/FormFieldRenderer";
import "./BuilderCanvas.css";
import {
  FieldTypeConfig,
  FieldTypeDefinition,
} from "../../../models/form/FieldTypeConfig";
import { FormField } from "../../../models/form/FormField";
import { FieldService } from "../../../services/FieldService";

import { FieldType } from "../../../models/form/FieldType";

import { createDefaultFormButtons } from "../FormFields/fields/types";

interface BuilderCanvasPorps {
  formFields: FormField[];
  onUpdateFormFields: (fields: FormField[]) => void;
  reindexFields: (fields: FormField[]) => FormField[];
}
const BuilderCanvas: React.FC<BuilderCanvasPorps> = ({
  formFields,
  onUpdateFormFields,
  reindexFields,
}) => {
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [draggedField, setDraggedField] = useState<String | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  React.useEffect(() => {
    if (
      selectedField &&
      !formFields.some((f) => f.fieldId === selectedField.fieldId)
    ) {
      setSelectedField(null);
    }
  }, [formFields, selectedField]);
  // Reference for field height measurement
  const fieldRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  // Handle dropping a new field onto the canvas
  const handleNewFieldDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    e.stopPropagation();

    setDropTargetIndex(null);

    const data = e.dataTransfer.getData("field");
    if (!data) return;

    const fieldTypeDefinition = JSON.parse(data) as FieldTypeDefinition;
    const newField = FieldService.createFormField(
      fieldTypeDefinition,
      formFields.length
    );

    // Separate buttons from other fields
    const buttonsFields = formFields.filter(
      (field) => field.type === FieldType.BUTTON
    );
    const nonButtonFields = formFields.filter(
      (field) => field.type !== FieldType.BUTTON
    );

    let newFields: FormField[] = [];

    if (fieldTypeDefinition.type === FieldType.BUTTON) {
      // If dropping a button, add it to the end
      newFields = [...nonButtonFields, newField, ...buttonsFields];
    } else {
      // If dropping a non-button field
      if (typeof targetIndex === "number") {
        // Adjust target index to account for only non-button fields
        const adjustedIndex = Math.min(targetIndex, nonButtonFields.length);
        nonButtonFields.splice(adjustedIndex, 0, newField);
        newFields = [...nonButtonFields];
      } else {
        // If no target index, add to the end of non-button fields
        newFields = [...nonButtonFields, newField];
      }

      // Always check if we need to add default buttons when adding a non-button field
      if (buttonsFields.length === 0) {
        const buttons = createDefaultFormButtons(newFields.length);
        newFields = [...newFields, buttons];
      } else {
        // Add existing buttons at the end
        newFields = [...newFields, ...buttonsFields];
      }
    }

    // Update the form fields
    onUpdateFormFields(newFields);
    setSelectedField(newField);

    //Handle drag end
    handleFieldDragEnd(e);
  };

  // Handle dragging over the canvas or between fields
  const handleDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    e.stopPropagation();

    // Always set isDraggingOver to true when dragging over the canvas
    setIsDraggingOver(true);

    // Only update dropTargetIndex if it's different
    if (typeof index === "number" && dropTargetIndex !== index) {
      setDropTargetIndex(index);

      // Remove drag-over class from all drop zones
      document.querySelectorAll(".field-drop-zone").forEach((el) => {
        el.classList.remove("drag-over");
      });

      // Add class to the current drop zone
      const currentDropZones = document.querySelectorAll(".field-drop-zone");
      if (index < currentDropZones.length) {
        currentDropZones[index].classList.add("drag-over");
      }
    }
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const dropZone = e.currentTarget as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;

    // Check if we're actually leaving the drop zone
    if (!dropZone.contains(relatedTarget)) {
      dropZone.classList.remove("drag-over");

      // Only reset states if we're leaving the canvas entirely
      if (!document.querySelector(".form-container")?.contains(relatedTarget)) {
        setIsDraggingOver(false);
        setDropTargetIndex(null);
      }
    }
  };

  // Handle field dragging operations
  const handleDragStart = (fieldId: string) => {
    setIsDraggingOver(true);
    setDraggedField(fieldId);
  };

  const handleFieldDragOver = (e: React.DragEvent, fieldId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedField || draggedField === fieldId) return;

    const draggedFieldIndex = formFields.findIndex(
      (f) => f.fieldId === draggedField
    );
    const draggedItem = formFields[draggedFieldIndex];
    const targetIndex = formFields.findIndex((f) => f.fieldId === fieldId);

    // Don't allow dragging buttons before non-buttons or vice versa
    const isButton = draggedItem.type === FieldType.BUTTON;
    const targetIsButton = formFields[targetIndex].type === FieldType.BUTTON;

    if (isButton !== targetIsButton) return;

    // Create a new array with the reordered fields
    const newFields = [...formFields];
    newFields.splice(draggedFieldIndex, 1);
    newFields.splice(targetIndex, 0, draggedItem);

    // Reindex the fields to ensure proper ordering
    onUpdateFormFields(reindexFields(newFields));
  };

  const handleFieldDragEnd = (e: React.DragEvent) => {
    setDraggedField(null);
    setDropTargetIndex(null);
    setIsDraggingOver(false);
    // Remove all drag-over classes
    document.querySelectorAll(".drag-over").forEach((el) => {
      el.classList.remove("drag-over");
    });
  };

  const handleFieldDeleteFromCanvas = (field: FormField) => {
    const fieldsAfterDelete = formFields.filter(
      (f) => f.fieldId !== field.fieldId
    );

    onUpdateFormFields(fieldsAfterDelete);
    if (
      selectedField?.fieldId === field.fieldId ||
      fieldsAfterDelete.length === 0
    ) {
      setSelectedField(null);
    }
  };
  const handleFieldPropertyUpdate = (updatedField: FormField) => {
    // Find the index of the field we're updating
    const fieldIndex = formFields.findIndex(
      (f) => f.fieldId === selectedField?.fieldId
    );

    if (fieldIndex !== -1) {
      // Create new array with updated field
      const updatedFields = [...formFields];
      updatedFields[fieldIndex] = updatedField;

      // Update the fields
      onUpdateFormFields(updatedFields);

      // Update selected field to match the new field data
      setSelectedField(updatedField);
    }
  };
  const renderDropIndicator = (index: number) => {
    const isActive = dropTargetIndex === index;

    return (
      <div
        className={`drop-indicator ${isActive ? "active" : ""}`}
        style={{ opacity: isActive ? 1 : 0 }}
      >
        <div className="drop-line"></div>
        <div className="drop-icon">
          <i className="fas fa-plus"></i>
        </div>
      </div>
    );
  };
  return (
    <div
      className={`d-flex flex-column h-100 canvas-container ${
        selectedField ? "with-panel" : ""
      }`}
    >
      <div className="canvas-scrollable-area">
        <div className="p-3">
          <div
            className={`p-3 flex-grow-1  rounded bg-body-secondary ${
              selectedField ? "me-[400px]" : ""
            }`}
          >
            <div className="mx-auto" style={{ maxWidth: "680px" }}>
              {formFields.length === 0 ? (
                // Empty state with drop zone
                <div
                  className={`empty-container ${
                    isDraggingOver ? "drag-over" : ""
                  }`}
                  onDrop={handleNewFieldDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <i className="fas fa-arrow-down text-secondary mb-2 fs-4"></i>
                  <p className="text-secondary mb-0">Drop form fields here</p>
                </div>
              ) : (
                // Form container with fields
                <div
                  className={`form-container border border-dark-subtle`}
                  onDrop={(e) => handleNewFieldDrop(e)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="d-flex flex-column">
                    {formFields.map((field, index) => (
                      <React.Fragment key={field.fieldId}>
                        <div
                          className={`field-drop-zone ${dropTargetIndex === index ? "drag-over" : ""} ${
                            draggedField || isDraggingOver ? "dragging" : ""
                          }`}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDrop={(e) => handleNewFieldDrop(e, index)}
                          onDragLeave={handleDragLeave}
                          data-index={index}
                        >
                          {renderDropIndicator(index)}
                        </div>

                        <div
                          ref={(el: HTMLDivElement | null) => {
                            if (el) {
                              fieldRefs.current[field.fieldId] = el;
                            } else {
                              delete fieldRefs.current[field.fieldId];
                            }
                          }}
                          className={`field-wrapper ${
                            selectedField?.fieldId === field.fieldId
                              ? "border border-primary"
                              : ""
                          }`}
                          draggable
                          onDragStart={() => handleDragStart(field.fieldId)}
                          onDragOver={(e) =>
                            handleFieldDragOver(e, field.fieldId)
                          }
                          onDragEnd={(e) => handleFieldDragEnd(e)}
                          onClick={() => setSelectedField(field)}
                          style={{ cursor: "pointer" }}
                          data-field-type={field.type}
                        >
                          <FormFieldRenderer
                            field={field}
                            onEdit={() => setSelectedField(field)}
                            onDelete={() => handleFieldDeleteFromCanvas(field)}
                            isDragging={draggedField === field.fieldId}
                            mode="builder"
                          />
                        </div>

                        {/* Add an additional drop zone after the last field */}
                        {index === formFields.length - 1 && (
                          <div
                            className={`field-drop-zone ${dropTargetIndex === formFields.length ? "drag-over" : ""} ${
                              draggedField || isDraggingOver ? "dragging" : ""
                            }`}
                            onDragOver={(e) =>
                              handleDragOver(e, formFields.length)
                            }
                            onDrop={(e) =>
                              handleNewFieldDrop(e, formFields.length)
                            }
                            onDragLeave={handleDragLeave}
                            data-index={formFields.length}
                          >
                            {renderDropIndicator(formFields.length)}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedField && (
        <PropertyPanel
          field={selectedField}
          onUpdate={(updatedField) => handleFieldPropertyUpdate(updatedField)}
          onClose={() => setSelectedField(null)}
        />
      )}
    </div>
  );
};

export default BuilderCanvas;
