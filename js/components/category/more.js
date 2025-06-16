// Component to go to load more category arts
export function moreCategoryButton() {
  const card = document.createElement('div');
  card.style.background = `hsl(210, 100%, 70%)`;
  card.className = 'small-card-loader'; // Styling will be in styles.css
  card.id = 'load-more-card';
  
  
  const imagewrapper = document.createElement('a');
  const image = document.createElement('img');
  imagewrapper.href = '';
  imagewrapper.className = 'new-image-wrapper';
  image.className = 'card-img loader-image category-button-image';
  image.src = '/media/plus.png';
  image.alt = 'Load More';

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);


    // Add Text
  const loadtext = document.createElement('a');
  loadtext.title = 'View More';
  loadtext.href = '';
  loadtext.className = 'loader-title category-button-title';
  loadtext.textContent = 'View More';
  card.appendChild(loadtext);

  return card;
}