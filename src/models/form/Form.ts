import { FormField } from "./FormField";
import { FormSettings } from "./FormSettings";
import { FormStatus } from "./FormStatus";

export interface Form {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  fields: FormField[];
  settings: FormSettings;
  status: FormStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastPublishedAt?: Date;
}
