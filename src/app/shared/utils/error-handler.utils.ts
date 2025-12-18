export class ErrorHandlerUtils {
  static getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Network error. Please check your internet connection.';
    } else if (error.status === 401 || error.status === 403) {
      return 'API key is invalid. Please check your configuration.';
    } else if (error.status === 404) {
      return 'GIF not found. It may have been removed.';
    } else if (error.status === 429) {
      return 'Too many requests. Please try again later.';
    } else if (error.status >= 500) {
      return 'Server error. Please try again later.';
    } else {
      return 'An error occurred. Please try again.';
    }
  }
}

