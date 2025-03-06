import { HttpStatusCode } from './../enums';

export interface ApiResponse<T> {
  status: HttpStatusCode;
  message: string;
  data: T;
  error: string;
}

// status, message, result

export interface AsyncAction<T> {
  messageId: string;
  payload: T;
}
