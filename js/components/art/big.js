import {locationHandler} from "../../controller/routes/locationHandler.js";
import * as utilities from '../../utilities/index.js'

// Component to create an artwork card
export function bigCard(artwork, artwork_manifest= null) {
  const card = document.createElement('div');
  card.className = 'artwork-card'; // Styling will be in styles.css


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
  const imagewrapper = document.createElement('a');
  const image = document.createElement('img');
  imagewrapper.className = 'card-image-wrapper';
  imagewrapper.href = `/art/${artwork.id}`;
  image.className = 'card-img SPA-link'; // all links with SPA-link class will be handled by routes.js file
  if (!artwork.image) {
    console.log(`Image for id: ${artwork.id} not available from API. Fetching placeholder image.`);
  }
  image.src = artwork.image || '/media/placeholder.jpg'; // Fallback image
  image.alt = '--Image Not Available--' || 'Artwork';

  // encountered when server has an issue and cannot show the image, then replace the image with placeholder
  image.addEventListener('error', function handleError() {
    // console.log(image.parentElement);
    // image.parentElement.remove();
    console.log(image.src, 'not available from the ARTIC server. Fetching placeholder image.');
    const defaultImage = '/media/placeholder.jpg';
  
      image.src = defaultImage;
      image.alt = 'default';
      
  });

  // handle image redirects
  image.addEventListener('click', function routeURL() {
    window.history.pushState({}, "", `/art/${artwork.id}`);
    locationHandler();
  });
  

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);


  // Add title
  const title = document.createElement('a');
  title.title = artwork.title;
  title.className = 'card-title SPA-link'; // all links with SPA-link class will be handled by routes.js file
  title.href = `/art/${artwork.id}`;
  title.appendChild(document.createTextNode(artwork.title));
  title.textContent = artwork.title || 'Untitled';
  card.appendChild(title);
  
  // Add Info Wrapper
  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'card-info';
  

  card.appendChild(infoWrapper);

  // Add artist
  const artists_wrapper = document.createElement('div');
  artists_wrapper.className = 'card-artists-wrapper';
  const artists_header = document.createElement('div');
  artists_header.className = 'card-header';
  artists_header.textContent =`Artists: `;
  artists_wrapper.appendChild(artists_header);
  const artists = document.createElement('ul');
  artists.className = 'card-ul';
 
  if (artwork.artists.length) {  // for each artist add their name and a link to their page
    artwork.artists.forEach( (artist, index) => {
      const aLink = document.createElement('a');
      aLink.className = 'card-list-item SPA-link'; // all links with SPA-link class will be handled by routes.js file
      aLink.title = `${artist}`;
      aLink.href = `/artist/${artwork.arists_links[index]}`;
      aLink.appendChild(document.createTextNode(`${artist}`));
      const outer_list = document.createElement('li');
      outer_list.appendChild(aLink);
      artists.appendChild(outer_list);
    });
  } else { // No artist data found so no <a> link needed.
    const noArtist = document.createElement('p');
    noArtist.className ='card-list-item';
    noArtist.innerText = 'No Known Artist';
    artists.appendChild(noArtist)
  }

  
  artists_wrapper.appendChild(artists);
  card.appendChild(artists_wrapper);


    
  
  // Add title
  const category_wrapper = document.createElement('div');
  category_wrapper.className = 'card-categories-wrapper';  
  const category_header = document.createElement('div');
  category_header.className = 'card-header';
  category_header.textContent =`  Categories: `;
  category_wrapper.appendChild(category_header);

  // Add categories
  const categories = document.createElement('ul');  
  categories.className = 'card-ul';  
  artwork.categories.forEach( (category, index) => { // add a link to each category
    const aLink = document.createElement('a');
    aLink.className = 'card-list-item SPA-link'; // all links with SPA-link class will be handled by routes.js file
    aLink.title = `${category} `;
    aLink.href = `/category/${artwork.category_links[index]}`;
    aLink.appendChild(document.createTextNode(`${category}`));
    const outer_list = document.createElement('li');
    outer_list.appendChild(aLink);
    categories.appendChild(outer_list);
  });
  category_wrapper.appendChild(categories);
  card.appendChild(category_wrapper);

  // Add Description
    const description = document.createElement('div');
    const desc_header = document.createElement('div');
    desc_header.className = 'card-title';
    desc_header.textContent =`Description`;
    description.className = 'card-description';
    if (artwork_manifest != null) { 
    if (typeof artwork_manifest.description[0] !== 'undefined') { 
      description.innerHTML = 
        utilities.truncate_string(artwork_manifest.description[0]['value'].replace(/\n/g, "<br /><br />"), 300)
      ;
      card.appendChild(desc_header);
      card.appendChild(description);
    }}
    else { if (( artwork.short_description || artwork.description )) {
      description.innerHTML = utilities.truncate_string( artwork.short_description || artwork.description, 300 ) ;
      card.appendChild(desc_header);
      card.appendChild(description);
    }}

  return card;
}
