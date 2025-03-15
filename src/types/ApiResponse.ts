export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  errors: any[] | null;
  data: T | null;
  meta?: any | null;
  statusCode: number;
}
