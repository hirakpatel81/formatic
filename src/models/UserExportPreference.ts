export interface UserExportPreference {
  name?: string;
  useTypeScript?: boolean;
  useValidation?: boolean;
  validationLibrary?: "zod" | "yup";
  useAxios?: boolean;
  cssFramework?: "bootstrap" | "tailwindcss";
  useReactQuery?: boolean;
  isDefault?: boolean;
}
