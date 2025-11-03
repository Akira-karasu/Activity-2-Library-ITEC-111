// src/services/handleError.js

interface ErrorResponse {
  success: boolean;
  message: string;
  status?: number;
}

export function handleError(error): ErrorResponse {
  if (error.response) {
    // Server responded with an error (4xx or 5xx)
    return {
      success: false,
      message: error.response.data.message || "Server error",
      status: error.response.status,
    };
  }

  if (error.request) {
    // Request sent but no response (network issues)
    return {
      success: false,
      message: "No response from server. Check your internet or backend.",
    };
  }

  // Something else went wrong
  return {
    success: false,
    message: error.message || "Unexpected error occurred",
  };
}
