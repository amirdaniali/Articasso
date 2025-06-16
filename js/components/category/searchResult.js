// Component to create a category Search Result
export function categoryResult(data=null) {
  const categoryContainer = document.createElement('div');
  categoryContainer.className = 'small-result'; // Styling will be in styles.css
  const aLink = document.createElement('a');
  aLink.className = 'small-result-item SPA-link'; // all links with SPA-link class will be handled by routes.js file
  aLink.title = data.title || 'Unknown';
  aLink.href = `/category/${data.id}`;
  aLink.textContent = data.title || 'Unknown';
  categoryContainer.appendChild(aLink);

  return categoryContainer;
}