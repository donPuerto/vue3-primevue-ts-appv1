import { BlobOptions } from "buffer";

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  accepted: boolean;
}

export interface Redirect {
  shouldRedirect: boolean;
  url: string;
}

export interface ErrorResponse {
  status: number;
  body: { message: string };
}
