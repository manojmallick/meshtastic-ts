import { ApiError } from "./errors.js";

export interface ClientOptions {
  /** HTTP gateway base (MeshPost-compatible or official HTTP API) */
  baseUrl?: string;
  token?: string;
  maxRetries?: number;
}

export class BaseClient {
  readonly baseUrl: string;
  private token?: string;
  private maxRetries: number;

  constructor(options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? "http://localhost:8080").replace(
      /\/+$/,
      "",
    );
    this.token = options.token;
    this.maxRetries = options.maxRetries ?? 2;
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");
    if (this.token) headers.set("Authorization", `Bearer ${this.token}`);
    if (init.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    for (let attempt = 0; ; attempt++) {
      const res = await fetch(`${this.baseUrl}${path}`, { ...init, headers });
      if (res.ok) {
        if (res.status === 204) return undefined as T;
        const text = await res.text();
        return text ? (JSON.parse(text) as T) : (undefined as T);
      }
      if (res.status < 500 || attempt >= this.maxRetries) {
        throw new ApiError(res.status, await res.text().catch(() => res.statusText));
      }
      await new Promise((r) => setTimeout(r, 2 ** attempt * 250));
    }
  }
}
