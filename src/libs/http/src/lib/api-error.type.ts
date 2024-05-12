export type ApiError = {
  error?: {
    status: number;
    info: string;
    message?: string;
    stack?: string;
  };
};
