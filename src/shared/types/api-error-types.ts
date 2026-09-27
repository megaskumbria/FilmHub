export interface ApiErrorMessage {
  message: string;
}

export interface ApiFieldError extends ApiErrorMessage {
  field: string;
  status: string;
}
