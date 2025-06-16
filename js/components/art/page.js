
// Component to create an artwork display
export function artPage(artwork, artwork_manifest= null) {
  const card = document.createElement('div');
  card.className = 'artwork-display'; // Styling will be in styles.css
  
  // Change the backgroud color if image colors are available

  try {
    if (artwork.color.l > 40){
      card.style.background = `hsl(${artwork.color.h},${artwork.color.s}%,${artwork.color.l}%)`;
    }
    else {
      card.style.background = `#a4a2a5`;
      // card.style.background = `hsl(${10 + Math.floor(Math.random() * 345)}, 100%, 65%)`;
    }
    
  } catch (error) {
      card.style.background = `#a4a2a5`;
      // card.style.background = `hsl(${10 + Math.floor(Math.random() * 345)}, 100%, 65%)`;
  }


  // Add image
  const imagewrapper = document.createElement('div');
  const image = document.createElement('img');
  imagewrapper.className = 'image-wrapper';
  
  // handle if image data isn't available from the api


  image.className = 'display-img ';
  if (!artwork.image) {
    console.log(`Image for id: ${artwork.id} not available from API. Fetching placeholder image.`);
  }
  image.src = artwork.image || '/media/placeholder.jpg'; // Fallback image
  image.alt = '--Image Not Available--' || 'Artwork';

  // handle cors errors from the server
  image.addEventListener('error', function handleError() {
    console.log(image.src, 'not available from the ARTIC server. Fetching placeholder image.');
    const defaultImage = '/media/placeholder.jpg';
  
      image.src = defaultImage;
      image.alt = 'default';
      
  });
  

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);
  // card.appendChild(image);

  // Add Info Wrapper
  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'display-info';


  // Add title
  const title = document.createElement('a');
  title.title = artwork.title;
  title.className = 'display-title';
  title.appendChild(document.createTextNode(artwork.title));
  title.textContent = artwork.title || 'Untitled';
  infoWrapper.appendChild(title);
  
  
  
  // Add id

  const id = document.createElement('a');
  id.title = `ID: ${artwork.id}`;
  id.className = 'display-id';
  id.appendChild(document.createTextNode(`ID: ${artwork.id}`));
  infoWrapper.appendChild(id);


  // Add Date
  const date_display = document.createElement('p');
  date_display.className = 'display-date';
  date_display.textContent = 'Date Displayed: ' + (artwork.date || 'No Date Known');
  infoWrapper.appendChild(date_display);

  

  // Add artist
  const artists_wrapper = document.createElement('div');
  artists_wrapper.className = 'display-artists-wrapper';
  const artists_header = document.createElement('div');
  artists_header.className = 'display-header';
  artists_header.textContent =`Artists: `;
  artists_wrapper.appendChild(artists_header);
  const artists = document.createElement('ul');
  artists.className = 'display-ul';

  if (artwork.artists.length) { // for each artist add their name and a link to their page
    artwork.artists.forEach( (artist, index) => {
      const aLink = document.createElement('a');
      aLink.className = 'display-list-item SPA-link'; // all links with SPA-link class will be handled by routes.js file
      aLink.title = `${artist}`;
      aLink.href = `/artist/${artwork.arists_links[index]}`;
      aLink.appendChild(document.createTextNode(`${artist}`));
      const outer_list = document.createElement('li');
      outer_list.appendChild(aLink);
      artists.appendChild(outer_list);
    });
  } else {
    const noArtist = document.createElement('p');
    noArtist.className ='display-list-item';
    noArtist.innerText = 'No Known Artist';
    artists.appendChild(noArtist)
  }

  
  artists_wrapper.appendChild(artists);
  infoWrapper.appendChild(artists_wrapper);


  // Add Description
  const description = document.createElement('div');
  const desc_header = document.createElement('div');
  desc_header.className = 'display-title';
  desc_header.textContent =`Description`;
  description.className = 'display-description';
  
  if (artwork_manifest != null) { // If there is a manifst description use it. 
    if (typeof artwork_manifest.description[0] !== 'undefined') { 
      description.innerHTML = artwork_manifest.description[0]['value'].replace(/\n/g, "<br /><br />") || ((( artwork.short_description || artwork.description )) || 'No description available.');
      infoWrapper.appendChild(desc_header);
      infoWrapper.appendChild(description);
    }}
    else {
      if (artwork.short_description || artwork.description) {
      description.innerHTML = artwork.short_description || artwork.description; 
      infoWrapper.appendChild(desc_header);
      infoWrapper.appendChild(description);} 

    }

  // Add title
  const category_wrapper = document.createElement('div');
  category_wrapper.className = 'display-categories-wrapper';  
  const category_header = document.createElement('div');
  category_header.className = 'display-header';
  category_header.textContent =`  Categories: `;
  category_wrapper.appendChild(category_header);

  // Add categories
  const categories = document.createElement('ul');  
  categories.className = 'display-ul';  
  artwork.categories.forEach( (category, index) => { // for each category add name and a link to its page
    const aLink = document.createElement('a');
    aLink.className = 'display-list-item SPA-link'; // all links with SPA-link class will be handled by routes.js file
    aLink.title = `${category} `;
    aLink.href = `/category/${artwork.category_links[index]}`;
    aLink.appendChild(document.createTextNode(`${category}`));
    const outer_list = document.createElement('li');
    outer_list.appendChild(aLink);
    categories.appendChild(outer_list);
  });
  category_wrapper.appendChild(categories);
  infoWrapper.appendChild(category_wrapper);

  card.appendChild(infoWrapper);

  return card;
}