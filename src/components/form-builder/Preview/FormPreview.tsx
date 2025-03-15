import React, { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import PreviewControls from "./PreviewControls";
import FormFieldRenderer from "../FormFields/FormFieldRenderer";
import { Form } from "../../../models/form/Form";
import { FormValidationService } from "../../../services/FormValidationService";
import "./Preview.css";

import { Framework } from "../../../models/form/Framework";
import FrameworkAlert from "../FormFields/components/FrameworkAlert";

interface FormPreviewProps {
  form: Form;
  isOpen: boolean;
  onClose: () => void;
}
const FormPreview: React.FC<FormPreviewProps> = ({ isOpen, onClose, form }) => {
  // State for preview settings
  const [theme, setTheme] = useState("light");
  const [layout, setLayout] = useState<"default" | "horizontal">("default");
  const [device, setDevice] = useState("desktop");
  const [orientation, setOrientation] = useState("portrait");
  const [selectedFramework, setSelectedFramework] = useState<Framework>(
    Framework.BOOTSTRAP
  );
  const [customCSS, setCustomCSS] = useState("");
  // Form state
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setErrors({});
    setFormData({});
    setIsSubmitting(false);

    //If we want to reset everythign
    // Optional: reset other preview settings to defaults if needed
    setTheme("light");
    setLayout("default");
    setDevice("desktop");
    setOrientation("portrait");
    setSelectedFramework(Framework.BOOTSTRAP);
  }, [isOpen]);

  // Handler for theme changes
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  // Handler for layout changes
  const handleLayoutChange = (newLayout: "default" | "horizontal") => {
    setLayout(newLayout);
  };

  // Handler for device changes
  const handleDeviceChange = (newDevice: string) => {
    setDevice(newDevice);

    if (newDevice === "desktop") {
      setOrientation("portrait");
    }
    if (newDevice === "mobile") {
      setLayout("default");
    }
  };

  // Handler for orientation changes
  const handleOrientationChange = (newOrientation: string) => {
    setOrientation(newOrientation);
  };
  // Handler for Framework changes
  const handleFrameworkChanges = (newFramework: Framework) => {
    const frameworkKey = newFramework.toUpperCase() as keyof typeof Framework;
    setSelectedFramework(Framework[frameworkKey]);
  };
  const getDeviceDimensions = () => {
    switch (device) {
      case "mobile":
        return orientation === "portrait"
          ? { width: "375px", height: "667px", maxHeight: "80vh" }
          : { width: "667px", height: "375px", maxHeight: "80vh" };
      case "tablet":
        return orientation === "portrait"
          ? { width: "768px", height: "1024px", maxHeight: "80vh" }
          : { width: "1024px", height: "768px", maxHeight: "80vh" };
      default:
        return {
          width: "100%",
          height: "auto",
          maxWidth: "1200px",
          maxHeight: "none",
        };
    }
  };

  const dimensions = getDeviceDimensions();

  //Handle Form Validation and submission
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Reset errors
    const newErrors = FormValidationService.validateForm(form.fields, formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(
        "Form submitted successfully!\n\n" + JSON.stringify(formData, null, 2)
      );
      setFormData({});
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      fullscreen={true}
      hideHeader={true}
      hideFooter={true}
    >
      {/* Preview Controls */}
      <PreviewControls
        theme={theme}
        onThemeChange={handleThemeChange}
        layout={layout}
        onLayoutChange={handleLayoutChange}
        device={device}
        onDeviceChange={handleDeviceChange}
        orientation={orientation}
        onOrientationChange={handleOrientationChange}
        selectedFramework={selectedFramework}
        onFrameworkChange={handleFrameworkChanges}
        onClose={onClose}
      />

      {/* Main Preview Area */}
      <div className="py-4 bg-body-tertiary flex-grow-1">
        <div
          className="d-flex justify-content-center"
          style={{
            marginRight: selectedFramework === Framework.CUSTOM ? "400px" : "0",
            transition: "margin-right 0.3s ease-in-out",
          }}
        >
          {/* Device Frame */}
          <div
            className="preview-frame shadow-sm"
            data-bs-theme={theme}
            style={{
              width: dimensions.width,
              height: dimensions.height,
              maxHeight: dimensions.maxHeight,
              maxWidth: dimensions.maxWidth,
              transition: "all 0.3s ease",
              borderRadius: "8px",
              overflow: device !== "desktop" ? "auto" : "visible",
              backgroundColor: "var(--bs-body-bg)",
              color: "var(--bs-body-color)",
            }}
          >
            <div className="p-3" data-bs-theme={theme}>
              <form onSubmit={handleSubmit} className="needs-validation">
                <FrameworkAlert
                  framework={selectedFramework}
                  title="Preview Mode - Test the form's behavior and validation"
                  icon={<i className="fas fa-eye me-2"></i>}
                />
                {form?.fields.map((field, index: number) => (
                  <FormFieldRenderer
                    key={index}
                    field={field}
                    mode="preview"
                    layout={layout}
                    onChange={(value) =>
                      handleFieldChange(field.fieldId, value)
                    }
                    error={errors[field.fieldId]}
                    framework={selectedFramework}
                  />
                ))}
              </form>
            </div>
          </div>
        </div>

        {/* CSS Editor Panel */}
        {/* <CSSEditorPanel
          selectedFramework={selectedFramework}
          customCSS={customCSS}
          onCustomCSSChange={setCustomCSS}
        /> */}
      </div>
    </Modal>
  );
};

export default FormPreview;
