export const ROUTES = {
  DASHBOARD: "/dashboard",
  PROJECTS: {
    DETAILS: (id: string) => `/projects/${id}`,
    FORMS: {
      LIST: (projectId: string) => `/projects/${projectId}/forms`,
      NEW: (projectId: string) => `/projects/${projectId}/forms/new`,
      DETAILS: (projectId: string, formId: string) =>
        `/projects/${projectId}/forms/${formId}`,
      EDIT: (projectId: string, formId: string) =>
        `/projects/${projectId}/forms/${formId}/edit`,
      PREVIEW: (projectId: string, formId: string) =>
        `/projects/${projectId}/forms/${formId}/preview`,
      RESPONSES: (projectId: string, formId: string) =>
        `/projects/${projectId}/forms/${formId}/responses`,
      SETTINGS: (projectId: string, formId: string) =>
        `/projects/${projectId}/forms/${formId}/settings`,
    },
  },
  SETTINGS: "/settings",
  SUBSCRIPTION: "/settings/subscription",
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/signin",
} as const;
