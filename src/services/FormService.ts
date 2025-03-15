import { ApiResponse } from "../types/ApiResponse";
import { Form } from "../models/form/Form";
import { FormSettings } from "../models/form/FormSettings";
import { FormField } from "../models/form/FormField";
import { LocalStorageService, STORAGE_KEYS } from "./LocalStorageService";
import { FormStatus } from "../models/form/FormStatus";

class FormsService {
  async createForm(data: {
    title: string;
    description?: string;
    projectId: string;
    fields?: FormField[];
    settings?: Partial<FormSettings>;
  }): Promise<ApiResponse<Form>> {
    const forms = LocalStorageService.getItem<Form[]>(STORAGE_KEYS.FORMS) || [];

    const newForm: Form = {
      id: LocalStorageService.generateId(),
      title: data.title,
      description: data.description || "",
      projectId: data.projectId,
      fields: data.fields || [],
      status: FormStatus.PUBLISHED,
      settings: {
        submitMessage: "Thank you for your submission!",
        theme: "default",
        layout: "default",
        storeSubmissions: true,
        emailNotifications: false,
        notificationEmails: [],
        ...data.settings,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "demo-user",
    };

    // Save to local storage
    forms.push(newForm);
    LocalStorageService.setItem(STORAGE_KEYS.FORMS, forms);

    return LocalStorageService.createApiResponse(newForm);
  }

  async getForms(projectId: string): Promise<ApiResponse<Form[]>> {
    const forms = LocalStorageService.getItem<Form[]>(STORAGE_KEYS.FORMS) || [];
    const projectForms = forms.filter((form) => form.projectId === projectId);

    return LocalStorageService.createApiResponse(projectForms);
  }

  async getForm(projectId: string, id: string): Promise<ApiResponse<Form>> {
    const forms = LocalStorageService.getItem<Form[]>(STORAGE_KEYS.FORMS) || [];
    const form = forms.find(
      (form) => form.projectId === projectId && form.id === id
    );

    if (!form) {
      return {
        isSuccess: false,
        message: "Form not found",
        errors: [{ message: "Form not found" }],
        data: null,
        statusCode: 404,
      };
    }

    return LocalStorageService.createApiResponse(form);
  }

  async updateForm(
    projectId: string,
    id: string,
    data: Partial<Omit<Form, "id" | "createdAt" | "updatedAt" | "createdBy">>
  ): Promise<ApiResponse<Form>> {
    const forms = LocalStorageService.getItem<Form[]>(STORAGE_KEYS.FORMS) || [];
    const formIndex = forms.findIndex(
      (form) => form.projectId === projectId && form.id === id
    );

    if (formIndex === -1) {
      return {
        isSuccess: false,
        message: "Form not found",
        errors: [{ message: "Form not found" }],
        data: null,
        statusCode: 404,
      };
    }

    forms[formIndex] = {
      ...forms[formIndex],
      ...data,
      updatedAt: new Date(),
    };

    LocalStorageService.setItem(STORAGE_KEYS.FORMS, forms);
    return LocalStorageService.createApiResponse(forms[formIndex]);
  }

  async deleteForm(projectId: string, id: string): Promise<void> {
    this.archiveForm(projectId, id);
  }

  async archiveForm(
    projectId: string,
    formId: string
  ): Promise<ApiResponse<void>> {
    const forms = LocalStorageService.getItem<Form[]>(STORAGE_KEYS.FORMS) || [];
    const formIndex = forms.findIndex(
      (form) => form.projectId === projectId && form.id === formId
    );

    // Archive the form
    forms[formIndex] = {
      ...forms[formIndex],
      updatedAt: new Date(),
    };

    LocalStorageService.setItem(STORAGE_KEYS.FORMS, forms);
    return LocalStorageService.createApiResponse(undefined);
  }

  async publishForm(projectId: string, id: string): Promise<ApiResponse<Form>> {
    return this.updateForm(projectId, id, {
      settings: {
        submitMessage: "Thank you for your submission!",
        theme: "default",
        layout: "default",
        storeSubmissions: true,
        emailNotifications: false,
        notificationEmails: [],
      },
    });
  }

  async createMinimalForm(
    projectId: string,
    title: string
  ): Promise<ApiResponse<Form>> {
    return this.createForm({
      title,
      description: "",
      projectId,
      fields: [],
      settings: {
        submitMessage: "Thank you for your submission!",
        theme: "default",
        layout: "default",
        storeSubmissions: true,
        emailNotifications: false,
        notificationEmails: [],
      },
    });
  }
}

export const formsService = new FormsService();
