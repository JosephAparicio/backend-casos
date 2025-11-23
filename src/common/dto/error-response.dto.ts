export class ErrorResponseDto {
  success: boolean;
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;

  constructor(
    statusCode: number,
    message: string,
    error: string,
    path: string,
  ) {
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.path = path;
  }
}
