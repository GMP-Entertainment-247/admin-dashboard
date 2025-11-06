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
