// Router
import { useRouter } from "vue-router";

interface ErrorResponse {
  status: number;
  body: { message: string };
}

interface Redirect {
  shouldRedirect: boolean;
  url: string;
}

export function useUtils() {
  function createErrorResponse(status: number, message: string): ErrorResponse {
    return {
      status,
      body: { message },
    };
  }
  function handleRedirect(data: Redirect): void {
    const router = useRouter();
    if (data.shouldRedirect) {
      router.replace(data.url);
    }
  }
  return {
    createErrorResponse,
    handleRedirect,
  };
}
