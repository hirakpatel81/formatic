import * as z from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(50, "Project name cannot exceed 50 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
