export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(`API request failed with status ${status}: ${message}`);
    this.name = "ApiError";
  }
}
