export interface ApiResponseDto<T = any> {
  status: boolean;
  message: string;
  result: T;
  timestamp: string;
}