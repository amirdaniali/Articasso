// Component to create the art work of the day display
export function dayHeader(artwork, artwork_manifest= null) {
  const card = document.createElement('div');
  card.className = 'artwork-day'; // Styling will be in styles.css
  
  card.style.backgroundImage = `linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6)),
    url(${artwork.image})`;
    
  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'display-info';

  // Add title
  const featuredArt = document.createElement('p');
  featuredArt.className = 'day-feature';
  featuredArt.textContent = "Today's Featured Art of the Day:";
  infoWrapper.appendChild(featuredArt);

  const title = document.createElement('a');
  title.title = artwork.title;
  title.className = 'day-title';
  title.href = `/art/${artwork.id}`;
  title.appendChild(document.createTextNode(artwork.title));
  title.textContent = artwork.title ;
  infoWrapper.appendChild(title);

    // Add artist
  if (typeof artwork.artists !== 'undefined' && artwork.artists[0] !== 'Unknown Artist') {
  const artist = document.createElement('p');
  artist.className = 'day-artist';
  artist.textContent = `by: ${artwork.artists[0] || 'Unknown Artist'}`;
  infoWrapper.appendChild(artist);
  }

  card.appendChild(infoWrapper);

  return card;
}