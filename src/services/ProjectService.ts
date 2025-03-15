import { Project } from "../models/Project";
import { ApiResponse } from "../types/ApiResponse";
import { LocalStorageService, STORAGE_KEYS } from "./LocalStorageService";

class ProjectService {
  private readonly BASE_PATH = "/projects";

  async createProject(data: {
    name: string;
    description?: string;
  }): Promise<ApiResponse<Project>> {
    // Get existing projects
    const projects =
      LocalStorageService.getItem<Project[]>(STORAGE_KEYS.PROJECTS) || [];

    // Create new project
    const newProject: Project = {
      id: LocalStorageService.generateId(),
      name: data.name,
      description: data.description || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "demo-user",
      isArchived: false,
      formCount: 0,
    };

    // Save projects
    projects.push(newProject);
    LocalStorageService.setItem(STORAGE_KEYS.PROJECTS, projects);

    // Return response
    return LocalStorageService.createApiResponse(newProject);
  }

  async getProjects(): Promise<ApiResponse<Project[]>> {
    // Get projects and filter out archived ones
    const projects =
      LocalStorageService.getItem<Project[]>(STORAGE_KEYS.PROJECTS) || [];
    const activeProjects = projects.filter((p) => !p.isArchived);

    // Get forms to calculate formCount
    const forms = LocalStorageService.getItem<any[]>(STORAGE_KEYS.FORMS) || [];

    // Update form counts
    const projectsWithFormCounts = activeProjects.map((project) => {
      const formCount = forms.filter(
        (form) => form.projectId === project.id && !form.isArchived
      ).length;
      return { ...project, formCount };
    });

    return LocalStorageService.createApiResponse(projectsWithFormCounts);
  }

  async getProject(id: string): Promise<ApiResponse<Project | null>> {
    const projects =
      LocalStorageService.getItem<Project[]>(STORAGE_KEYS.PROJECTS) || [];
    const project = projects.find((p) => p.id === id && !p.isArchived);

    if (!project) {
      return {
        isSuccess: false,
        message: "Project not found",
        errors: [{ message: "Project not found" }],
        data: null,
        statusCode: 404,
      };
    }

    return LocalStorageService.createApiResponse(project);
  }

  async updateProject(
    id: string,
    data: { name?: string; description?: string }
  ): Promise<ApiResponse<Project>> {
    const projects =
      LocalStorageService.getItem<Project[]>(STORAGE_KEYS.PROJECTS) || [];
    const projectIndex = projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return {
        isSuccess: false,
        message: "Project not found",
        errors: [{ message: "Project not found" }],
        data: null,
        statusCode: 404,
      };
    }

    // Update project
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...data,
      updatedAt: new Date(),
    };

    LocalStorageService.setItem(STORAGE_KEYS.PROJECTS, projects);
    return LocalStorageService.createApiResponse(projects[projectIndex]);
  }

  async deleteProject(id: string): Promise<void> {
    this.archiveProject(id);
  }

  async archiveProject(id: string): Promise<ApiResponse<Project>> {
    const projects =
      LocalStorageService.getItem<Project[]>(STORAGE_KEYS.PROJECTS) || [];
    const projectIndex = projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return {
        isSuccess: false,
        message: "Project not found",
        errors: [{ message: "Project not found" }],
        data: null,
        statusCode: 404,
      };
    }

    // Archive project
    projects[projectIndex] = {
      ...projects[projectIndex],
      isArchived: true,
      updatedAt: new Date(),
    };

    LocalStorageService.setItem(STORAGE_KEYS.PROJECTS, projects);
    return LocalStorageService.createApiResponse(projects[projectIndex]);
  }
}

export const projectService = new ProjectService();
