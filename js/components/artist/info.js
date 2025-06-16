
// Component to show the data about an artist
export function artistInformation(artist) {
  const card = document.createElement('div');
  card.className = 'artist-info'; // Styling will be in styles.css
  
  // Add title
  const title = document.createElement('p');
  title.className = 'artist-title';
  title.textContent = artist.data.title || 'Unknown Artist';
  card.appendChild(title);


  const other_names = document.createElement('div');
  other_names.className = 'artist-other-names';
  other_names.textContent = 'Artist Other Names: ' + (artist.data.alt_titles || 'No Other Names Used');
  card.appendChild(other_names);

  // Add Info Wrapper
  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'artist-info';

  // Add id

  const id = document.createElement('a');
  id.title = `Artist ID: ${artist.data.id}`;
  id.className = 'artist-id SPA-link';  // all links with SPA-link class will be handled by routes.js file
  id.href = `/artist/${artist.data.id}`;
  id.appendChild(document.createTextNode(`Artist ID: ${artist.data.id}`));
  infoWrapper.appendChild(id);


  // Add Date
  const date_display = document.createElement('p');
  date_display.className = 'artist-date';
  date_display.innerHTML = 'Artist Date of Birth: ' + (artist.data.birth_date || 'No Date Known') + '<br>' + 'Artist Date of Death: ' + (artist.data.death_date || 'No Date Known');
  infoWrapper.appendChild(date_display);


  card.appendChild(infoWrapper);

  if (artist.data.description && artist.data.description !== null) {
      const description = document.createElement('div');
    const desc_header = document.createElement('div');
    desc_header.className = 'card-title';
    desc_header.textContent =`Description`;
    description.className = 'artist-description';
    description.innerHTML = ( artist.data.description || 'No description available.' );
    card.appendChild(desc_header);
    card.appendChild(description);
  }
  return card
}
