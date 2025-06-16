// Component to create an error message
export function errorMessage(errorMessage) {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-message'; // Styling will be in styles.css
  errorContainer.textContent = errorMessage || 'An error occurred. Please try again.';

  return errorContainer;
}