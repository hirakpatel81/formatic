import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Form } from "../../models/form/Form";
import { Project } from "../../models/Project";

import { useApiMutation, useApiQuery } from "../../hooks/useQueryUtils";
import { useToast } from "../../hooks/useToast";
import { ROUTES } from "../../constants/Routes";
import { projectService } from "../../services/ProjectService";
import { CreateProjectInput } from "../../lib/validation/project";

import FormsDisplay from "./FormsDisplay";
import FormModalManager from "./FormModalManager";
import EmptyState from "./EmptyState";
import { LoadingSpinner } from "../common/LoadingSpinner/LoadingSpinner";
import { formsService } from "../../services/FormService";
import { NoFormsEmptyState } from "./NoFormsEmptyState";
import { useAuth } from "../../hooks/useAuth";
import DashboardPlaceholder from "./DashboardPlaceholder";

const Dashboard: React.FC = () => {
  const { appUser } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentProjectId = searchParams.get("projectId");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"created" | "modified">("created");

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Modal states
  const [showWelcome, setShowWelcome] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [isQuickProjectModalOpen, setIsQuickProjectModalOpen] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    data: forms,
    isLoading: formsLoading,
    refetch: refetchForms,
  } = useApiQuery<Form[]>(
    ["forms", currentProjectId || ""],
    () => formsService.getForms(currentProjectId!),
    {
      enabled: !!currentProjectId,
    }
  );

  const createProjectMutation = useApiMutation<
    Project,
    { name: string; description?: string }
  >((data) => projectService.createProject(data), {
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      showToast("Project created successfully", "success");
      setIsCreateProjectModalOpen(false);
      setIsQuickProjectModalOpen(false);
    },
    onError: (error) => {
      showToast("Failed to create project", "danger");
    },
  });

  const createFormMutation = useApiMutation<Form, { projectId: string }>(
    ({ projectId }) =>
      formsService.createMinimalForm(projectId, "Untitled Form"),
    {
      onSuccess: (form) => {
        queryClient.invalidateQueries({
          queryKey: ["forms", currentProjectId],
        });
        showToast("Form created successfully", "success");
        navigate(ROUTES.PROJECTS.FORMS.EDIT(currentProjectId!, form.id));
      },
      onError: (error) => {
        showToast("Failed to create form", "danger");
      },
    }
  );

  const handleCreateMinimalForm = async (projectId: string) => {
    await createFormMutation.mutateAsync({ projectId });
  };
  const handleEmptyStateCreateProject = () => {
    setIsCreateProjectModalOpen(true);
  };

  const handleEmptyStateQuickCreate = () => {
    setIsQuickProjectModalOpen(true);
  };
  const handleEditForm = (formId: string) => {
    navigate(ROUTES.PROJECTS.FORMS.EDIT(currentProjectId!, formId));
  };

  const handleCreateProject = async (data: CreateProjectInput) => {
    await createProjectMutation.mutateAsync(data);
  };

  const handleExploreOnOwn = () => {
    setShowWelcome(false);
  };

  // Show loading spinner while fetching forms
  if (formsLoading) {
    return <DashboardPlaceholder />;
  }

  return (
    <>
      {!currentProjectId ? (
        <>
          <EmptyState
            onCreateProject={() => setIsCreateProjectModalOpen(true)}
            onCreateForm={() => setIsQuickProjectModalOpen(true)}
          />
        </>
      ) : (
        <>
          {!forms || forms.length === 0 ? (
            <>
              <div className="container-fluid p-4">
                <NoFormsEmptyState
                  projectId={currentProjectId}
                  onCreateForm={() => handleCreateMinimalForm(currentProjectId)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="container-fluid p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <button
                    className="btn formatic-btn-primary"
                    onClick={() => handleCreateMinimalForm(currentProjectId)}
                  >
                    <i className="fas fa-plus me-2"></i>
                    Create a Form
                  </button>
                </div>

                <FormsDisplay
                  forms={forms!}
                  viewMode={viewMode}
                  openDropdownId={openDropdownId}
                  onEdit={handleEditForm}
                  onDropdownToggle={setOpenDropdownId}
                  projectId={currentProjectId!}
                />
              </div>
            </>
          )}
        </>
      )}

      <FormModalManager
        showWelcome={showWelcome}
        onWelcomeClose={() => setShowWelcome(false)}
        onWelcomeExploreOnOwm={handleExploreOnOwn}
        isCreateProjectModalOpen={isCreateProjectModalOpen}
        onCreateProjectModalClose={() => setIsCreateProjectModalOpen(false)}
        isQuickProjectModalOpen={isQuickProjectModalOpen}
        onQuickProjectModalClose={() => setIsQuickProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </>
  );
};

export default Dashboard;
