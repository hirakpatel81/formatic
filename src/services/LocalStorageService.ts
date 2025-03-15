const STORAGE_KEYS = {
  PROJECTS: "formatic_projects",
  FORMS: "formatic_forms",
  USER: "formatic_user",
};

export class LocalStorageService {
  static getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  }

  static setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static removeItem(key: string): void {
    localStorage.setItem(key, "");
  }

  static generateId(): string {
    return (
      Math.random().toString(36).substring(2, 11) + Date.now().toString(36)
    );
  }

  static createApiResponse<T>(data: T): any {
    return {
      isSuccess: true,
      message: "Operation successful",
      errors: null,
      data,
      statusCode: 200,
    };
  }
}

export { STORAGE_KEYS };
