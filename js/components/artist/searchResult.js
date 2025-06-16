// Component to create an Artist Search Result
export function artistResult(data=null) {
  const artistContainer = document.createElement('div');
  artistContainer.className = 'small-result'; // Styling will be in styles.css
  const aLink = document.createElement('a');
  aLink.className = 'small-result-item SPA-link'; // all links with SPA-link class will be handled by routes.js file
  aLink.title = data.title || 'Unknown';
  aLink.href = `/artist/${data.id}`;
  aLink.textContent = data.title || 'Unknown';
  artistContainer.appendChild(aLink);

  return artistContainer;
}

