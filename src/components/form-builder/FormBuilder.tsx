import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FieldType from "./FieldType/FieldTypes";
import BuilderCanvas from "./BuilderCanvas/BuilderCanvas";
import { ROUTES } from "../../constants/Routes";
import FormRenameModal from "../forms/common/FormRenameModal";
import { FormField } from "../../models/form/FormField";
import FormPreview from "./Preview/FormPreview";
import { useApiMutation, useApiQuery } from "../../hooks/useQueryUtils";
import { formsService } from "../../services/FormService";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../hooks/useToast";
import { LoadingSpinner } from "../common/LoadingSpinner/LoadingSpinner";

import { Form } from "../../models/form/Form";
import { FieldType as InputFieldType } from "../../models/form/FieldType";

function FormBuilder() {
  const navigate = useNavigate();
  const { formId, projectId } = useParams();
  const headerRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState<Form | null>(null);

  const [fields, setFields] = useState<FormField[]>([]);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // Fetch form data
  const {
    data: fetchedForm,
    isLoading,
    error,
    refetch,
  } = useApiQuery(
    ["form", formId!],
    () => formsService.getForm(projectId!, formId!),
    {
      enabled: !!formId && !!projectId,
    }
  );
  useEffect(() => {
    if (fetchedForm?.fields) {
      setForm(fetchedForm);
      setFields(fetchedForm.fields);
    }
  }, [fetchedForm]);
  useEffect(() => {
    if (form) {
      setForm({ ...form, fields });
    }
  }, [fields]);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
    }
  }, []);
  const updateFormMutation = useApiMutation(
    (data: Form) => formsService.updateForm(projectId!, formId!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["forms", projectId] });
        queryClient.invalidateQueries({ queryKey: ["form", formId] });
        if (currentOperation === "rename") {
          showToast("Form renamed successfully", "success");
          setIsRenameModalOpen(false);
        } else if (currentOperation === "publish") {
          showToast("Form published successfully", "success");
        }
        setCurrentOperation(null);
      },
      onError: () => {
        if (currentOperation === "rename") {
          showToast("Failed to rename form", "danger");
        } else if (currentOperation === "publish") {
          showToast("Failed to publish form", "danger");
        }
        setCurrentOperation(null);
      },
    }
  );
  const handleUpdateFormFields = (formFields: FormField[]) => {
    setFields(formFields);
  };
  const handleGoToDashboard = () => {
    setSearchParams({ projectId: projectId! });
    navigate(`${ROUTES.DASHBOARD}?projectId=${projectId}`);
  };
  const handleRename = async (data: { title: string }) => {
    setCurrentOperation("rename");
    await updateFormMutation.mutateAsync({
      ...form!,
      ...data,
    });
  };
  const reindexFields = (fields: FormField[]): FormField[] => {
    return fields.map((field, index) => ({
      ...field,
      orderIndex: index,
    }));
  };
  const handlePublish = async (fromExport = false) => {
    if (!fromExport) setCurrentOperation("publish");

    // Sort fields by type (buttons at the end)
    const nonButtonFields = fields.filter(
      (f) => f.type !== InputFieldType.BUTTON
    );
    const buttonFields = fields.filter((f) => f.type === InputFieldType.BUTTON);

    // Combine and reindex
    const sortedFields = reindexFields([...nonButtonFields, ...buttonFields]);

    console.log(
      JSON.stringify(
        {
          ...form!,
          fields: sortedFields,
        },
        null,
        2
      )
    );

    await updateFormMutation.mutate({
      ...form!,
      fields: sortedFields,
    });
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading form..." />;
  }

  return (
    <div className="d-flex flex-column h-100">
      {/* Header */}
      <header className="border-bottom bg-white">
        {/* Main Toolbar */}
        <div className="d-flex align-items-center p-3">
          {/* Left Section */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary formatic-btn-outline-secondary me-3"
              onClick={handleGoToDashboard}
              title="Back to Dashboard"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>

          {/* Center Section - Form Title */}
          <div className="flex-grow-1 d-flex justify-content-center">
            <button
              className="btn btn-link text-decoration-none text-body"
              onClick={() => setIsRenameModalOpen(true)}
            >
              <h5 className="mb-0 d-flex align-items-center">
                {form?.title || "Untitled Form"}
                <i className="fas fa-pen ms-2 text-secondary small"></i>
              </h5>
            </button>
          </div>

          {/* Right Section - Actions */}
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary formatic-btn-outline-secondary"
              onClick={() => setIsPreviewModalOpen(true)}
            >
              <i className="fas fa-eye me-2"></i>
              Preview
            </button>

            <button
              className="btn formatic-btn-primary"
              onClick={() => handlePublish(false)}
              disabled={currentOperation === "publish"}
            >
              <i className="fas fa-paper-plane me-2"></i>
              {currentOperation === "publish" ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      {/* Builder Content */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Left Sidebar - Field Types */}
        <aside style={{ width: "280px", minWidth: "280px" }}>
          <FieldType />
        </aside>

        {/* Main Canvas */}
        <main className="flex-grow-1 overflow-auto">
          <BuilderCanvas
            formFields={fields}
            onUpdateFormFields={handleUpdateFormFields}
            reindexFields={reindexFields}
          />
        </main>
      </div>

      {/* Modals */}
      <FormRenameModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        form={form!}
        onSuccess={handleRename}
      />

      <FormPreview
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        form={form!}
      />
    </div>
  );
}

export default FormBuilder;
