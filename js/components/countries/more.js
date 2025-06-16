// Component to load more countries
export function moreCountriesButton() {
  const card = document.createElement('div');
  card.style.background = `hsl(210, 100%, 70%)`;
  card.className = 'small-card-loader'; // Styling will be in styles.css
  card.id = 'load-more-card';
  
  
  const imagewrapper = document.createElement('a');
  const image = document.createElement('img');
  imagewrapper.href = '';
  imagewrapper.className = 'new-image-wrapper';
  image.className = 'card-img loader-image countries-button-image';
  image.src = '/media/plus.png';
  image.alt = 'Go to Feed';

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);


    // Add Text
  const loadtext = document.createElement('a');
  loadtext.title = 'View More';
  loadtext.href = '';
  loadtext.className = 'loader-title countries-button-title';
  loadtext.textContent = 'View More';
  card.appendChild(loadtext);

  return card;
}