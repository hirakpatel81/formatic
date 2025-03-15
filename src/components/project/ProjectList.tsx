import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Project } from "../../models/Project";
import ProjectActions from "./ProjectActions";
import CreateProjectModal from "./CreateProjectModal";
import { useToast } from "../../hooks/useToast";

import ProjectRenameModal from "./ProjectRenameModal";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import ConfirmationModal from "../common/ConfirmationModal";
import { projectService } from "../../services/ProjectService";
import { useApiMutation, useApiQuery } from "../../hooks/useQueryUtils";
import { useSearchParams } from "react-router-dom";
const ProjectPlaceholder = () => {
  return (
    <div className="px-3 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6
          className="mb-0 text-uppercase"
          style={{ letterSpacing: "0.5px", fontWeight: 600 }}
        >
          PROJECTS
        </h6>
        <button
          className="btn p-0"
          style={{
            width: "26px",
            height: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
          }}
          disabled
        >
          <i className="fas fa-plus" style={{ fontSize: "12px" }}></i>
        </button>
      </div>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="workspace-item mb-2 placeholder-glow"
          style={{
            padding: "12px 16px",
            borderRadius: "4px",
            border: "1px solid var(--color-400)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <span className="placeholder col-6"></span>
            <span className="placeholder col-2"></span>
          </div>
        </div>
      ))}
    </div>
  );
};
export const ProjectList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentProjectId = searchParams.get("projectId");
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Fetch projects
  const {
    data: projects,
    isLoading,
    error,
    refetch,
  } = useApiQuery<Project[]>("projects", () => projectService.getProjects());

  const createProjectMutation = useApiMutation<
    Project,
    { name: string; description?: string }
  >((data) => projectService.createProject(data), {
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      showToast("Project created successfully", "success");
      setIsCreateModalOpen(false);
    },
    onError: (error) => {
      showToast("Failed to create project", "danger");
    },
  });

  const updateProjectMutation = useApiMutation<
    Project,
    { id: string; data: { name: string; description?: string } } // Request payload type
  >(({ id, data }) => projectService.updateProject(id, data), {
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      showToast("Project updated successfully", "success");

      setIsRenameModalOpen(false);
      setSelectedProject(null);
    },
    onError: (error) => {
      showToast("Project updated failed", "danger");
    },
  });
  const deleteProjectMutation = useApiMutation<Project, string>(
    (projectId) => projectService.archiveProject(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        showToast("Project deleted successfully", "success");
      },
      onError: () => {
        showToast("Project deletion failed", "danger");
      },
    }
  );

  useEffect(() => {
    // If no project selected but we have projects, select first one
    if (!currentProjectId && projects && projects!.length > 0) {
      setSearchParams({ projectId: projects![0].id });
    }
  }, [projects, currentProjectId]);
  // Delete project confirmation and mutation
  const {
    isDeleteModalOpen,
    itemToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    confirmationMessage,
    modalTitle,
    isDeleting,
  } = useDeleteConfirmation<Project>({
    title: "Delete Project",
    getConfirmationMessage: (project) => (
      <>
        <p>Are you sure you want to delete "{project.name}"?</p>
        <p>This will permanently delete:</p>
        <ul className="mb-0">
          <li>The project and all its settings</li>
          <li>All forms in this project</li>
          <li>All form responses and data</li>
        </ul>
      </>
    ),
    onDelete: async (project) => {
      await deleteProjectMutation.mutateAsync(project.id);
    },
  });

  const handleRenameClick = (project: Project) => {
    setSelectedProject(project);
    setIsRenameModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleCreateProject = async (data: {
    name: string;
    description?: string;
  }) => {
    await createProjectMutation.mutateAsync(data);
  };

  const handleRenameSuccess = async (data: {
    name: string;
    description?: string;
  }) => {
    if (!selectedProject) return;
    await updateProjectMutation.mutateAsync({
      id: selectedProject.id,
      data,
    });
  };

  const toggleDropdown = (projectId: string) => {
    setOpenDropdownId(openDropdownId === projectId ? null : projectId);
  };
  const handleProjectClick = (projectId: string) => {
    setSearchParams({ projectId: projectId });
  };

  if (isLoading) {
    return <ProjectPlaceholder />;
  }

  return (
    <div className="px-3 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6
          className="mb-0 text-uppercase"
          style={{ letterSpacing: "0.5px", fontWeight: 600 }}
        >
          PROJECTS
        </h6>
        <button
          className="btn p-0"
          style={{
            width: "26px",
            height: "26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
          }}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <i className="fas fa-plus" style={{ fontSize: "12px" }}></i>
        </button>
      </div>

      {projects!.length === 0 ? (
        <div className="text-center text-secondary p-3">No projects yet</div>
      ) : (
        projects!.map((project: Project) => (
          <div
            key={project.id}
            onClick={(e) => handleProjectClick(project.id)}
            className="workspace-item mb-2"
            style={{
              padding: "12px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: `${
                currentProjectId === project.id
                  ? "var(--color-100)"
                  : "transparent"
              }`,
              border: `1px solid ${
                currentProjectId === project.id
                  ? "var(--color-500)"
                  : "var(--color-400)"
              }`,
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: currentProjectId === project.id ? 500 : 400,
                  color:
                    currentProjectId === project.id
                      ? "var(--color-500)"
                      : "var(--color-400)",
                }}
              >
                {project.name}
              </span>

              <ProjectActions
                project={project}
                onRename={handleRenameClick}
                onDelete={handleDeleteClick}
                isOpen={openDropdownId === project.id}
                onToggle={() => toggleDropdown(project.id)}
              />
            </div>
          </div>
        ))
      )}

      {/* Modals */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
      <ProjectRenameModal
        isOpen={isRenameModalOpen}
        onClose={() => {
          setIsRenameModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onSuccess={handleRenameSuccess}
        isSubmitting={updateProjectMutation.isPending}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen || isDeleting}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={modalTitle}
        message={confirmationMessage}
        confirmButtonText="Delete"
        isDestructive={true}
      />
    </div>
  );
};
