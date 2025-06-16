// Component to create a generic loader (for "loading" placeholders)
export function loader() {
  const loader = document.createElement('div');
  loader.className = 'loader'; // Styling will be in styles.css
  loader.textContent = 'Loading...';

  return loader;
}