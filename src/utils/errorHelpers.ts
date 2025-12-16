/**
 * Flattens error messages from API responses into a single string
 * Handles both string messages and object messages with nested arrays
 *
 * @param message - The message from API response (string or object)
 * @param defaultMessage - Optional default message to use when no valid message is found
 * @returns Flattened error message string
 */
export const flattenErrorMessage = (
  message: string | Record<string, string | string[]> | null | undefined,
  // | object,
  defaultMessage: string = "An error occurred"
): string => {
  if (!message) {
    return defaultMessage;
  }

  if (typeof message === "string") {
    return message;
  }

  if (typeof message === "object") {
    const errorMessages: string[] = [];

    // Iterate through all error entries
    Object.entries(message).forEach(([field, messages]) => {
      if (Array.isArray(messages)) {
        // Add all messages from the array
        errorMessages.push(...messages);
      } else if (typeof messages === "string") {
        // Add single string message
        errorMessages.push(messages);
      }
    });

    // Join all error messages with newlines or commas
    return errorMessages.length > 0 ? errorMessages.join("; ") : defaultMessage;
  }

  return defaultMessage;
};

/**
 * Safely extracts and flattens API error messages from Axios or manual errors.
 *
 * @param error - The caught error object from API calls
 * @param defaultMessage - Message to use if no valid error message is found
 * @returns A human-readable error message
 */
export const handleApiError = (
  error: any,
  defaultMessage: string = "An error occurred"
): string => {
  // Extract API message if available
  const apiMessage = error?.response?.data?.message || error?.message || null;

  // Reuse existing helper to flatten nested error structures
  return flattenErrorMessage(apiMessage, defaultMessage);
};
