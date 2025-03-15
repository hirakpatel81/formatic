export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public severity: "toast" | "error-display" | "both" = "both",
    public errors?: { field?: string; message: string }[]
  ) {
    super(message);
    this.name = "ApiError";
  }
}
