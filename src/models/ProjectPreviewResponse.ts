export interface ProjectPreviewResponse {
  projectId: string;
  formId: string;
  generatedId: string;
  projectName: string;

  projectStructure: Record<string, ProjectStructure>;
}

export interface ProjectStructure {
  [key: string]: ProjectStructure | string;
}
