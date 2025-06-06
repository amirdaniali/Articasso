import {locationHandler} from "./routes.js";
import {truncateString} from './helpers.js';
import {displayFeedPage} from './app.js';

// Component to create an artwork card
export function createArtworkCard(artwork, artwork_manifest= null) {
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
  
  // Add id

  // const id = document.createElement('a');
  // id.title = `ID: ${artwork.id}`;
  // id.className = 'card-id SPA-link'; // all links with SPA-link class will be handled by routes.js file
  // id.href = `/art/${artwork.id}`;
  // id.appendChild(document.createTextNode(`ID: ${artwork.id}`));
  // infoWrapper.appendChild(id);


  // Add Date
  // const date_display = document.createElement('p');
  // date_display.className = 'card-date';
  // date_display.textContent = 'Date Displayed: ' + (artwork.date || 'No Date Known');
  // infoWrapper.appendChild(date_display);

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
        truncateString(artwork_manifest.description[0]['value'].replace(/\n/g, "<br /><br />"), 300)
      ;
      card.appendChild(desc_header);
      card.appendChild(description);
    }}
    else { if (( artwork.short_description || artwork.description )) {
      description.innerHTML = truncateString( artwork.short_description || artwork.description, 300 ) ;
      card.appendChild(desc_header);
      card.appendChild(description);
    }}

  return card;
}
    
// Component to create a generic loader (for "loading" placeholders)
export function createLoader() {
  const loader = document.createElement('div');
  loader.className = 'loader'; // Styling will be in styles.css
  loader.textContent = 'Loading...';

  return loader;
}

// Component to go to feed
export function feedCard() {
  const card = document.createElement('div');
  card.style.background = `hsl(210, 100%, 70%)`;
  card.className = 'feed-handler-card'; // Styling will be in styles.css
  
  
  const imagewrapper = document.createElement('a');
  const image = document.createElement('img');
  imagewrapper.className = 'new-image-wrapper';
  imagewrapper.href = `/feed`;
  image.className = 'card-img SPA-link';
  image.src = '/media/redirect.svg';
  image.alt = 'Go to Feed';
  image.addEventListener('click', function routeURL() {
    window.history.pushState({}, "", `/feed`);
    locationHandler();
      
  });

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);


    // Add Text
  const moveToFeed = document.createElement('a');
  moveToFeed.title = 'View More';
  moveToFeed.className = 'internal-button-title SPA-link';
  moveToFeed.href = `/feed`;
  moveToFeed.textContent = 'View More';
  card.appendChild(moveToFeed);

  return card;
}


// Component to go to feed
export function loadMoreFeed() {
  const card = document.createElement('div');
  card.style.background = `hsl(210, 100%, 70%)`;
  card.className = 'feed-handler-card'; // Styling will be in styles.css
  card.id = 'load-more-card';
  
  
  const imagewrapper = document.createElement('a');
  const image = document.createElement('img');
  imagewrapper.href = '';
  imagewrapper.className = 'new-image-wrapper';
  image.className = 'card-img feed-button-image';
  image.src = '/media/plus.png';
  image.alt = 'Go to Feed';

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);


    // Add Text
  const loadtext = document.createElement('a');
  loadtext.title = 'View More';
  loadtext.href = '';
  loadtext.className = 'feed-button-title';
  loadtext.textContent = 'View More';
  card.appendChild(loadtext);

  return card;
}

// Component to go to Art Odyssey
export function odysseyCard() {
  const card = document.createElement('div');
  card.style.background = `hsl(210, 100%, 70%)`;
  card.className = 'odyssey-handler-card'; // Styling will be in styles.css
  
  
  const imagewrapper = document.createElement('a');
  const image = document.createElement('img');
  imagewrapper.className = 'odyssey-image-wrapper';
  imagewrapper.href = `/odyssey`;
  image.className = 'card-img SPA-link';
  image.src = '/media/redirect.svg';
  image.alt = 'Go to Art Odyssey';
  image.addEventListener('click', function routeURL() {
    window.history.pushState({}, "", `/odyssey`);
    locationHandler();
      
  });

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);


    // Add Text
  const moveToOdyssey = document.createElement('a');
  moveToOdyssey.title = 'Visit Art Odyssey';
  moveToOdyssey.className = 'internal-button-title SPA-link';
  moveToOdyssey.href = `/odyssey`;
  moveToOdyssey.innerHTML = 'View <span class="fancy-text">Art Odyssey</p>';
  card.appendChild(moveToOdyssey);

  return card;
}
  
// Component to create an error message
export function createErrorMessage(errorMessage) {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-message'; // Styling will be in styles.css
  errorContainer.textContent = errorMessage || 'An error occurred. Please try again.';

  return errorContainer;
}

// Component to create a search result item
export function createSearchResultItem(item) {
  const resultItem = document.createElement('div');
  resultItem.className = 'search-result-item'; // Styling will be in styles.css

  const title = document.createElement('h3');
  title.textContent = item.title || 'No Title';
  resultItem.appendChild(title);

  const snippet = document.createElement('p');
  snippet.textContent = item.snippet || 'No additional information.';
  resultItem.appendChild(snippet);

  return resultItem;
}

// Component to show the data about an artist
export function createArtistInfo(artist) {
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

// Component to show the data about a category
export function createCategoryInfo(category) {
  const card = document.createElement('div');
  card.className = 'category-info'; // Styling will be in styles.css
  
  // Add title
  const title = document.createElement('p');
  title.className = 'category-title';
  title.textContent = category.data.title || 'Unknown Category';
  card.appendChild(title);


  // Add Info Wrapper
  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'category-info';

  // Add subtype

  const subtype = document.createElement('h3');
  subtype.className = 'category-subtype';
  subtype.textContent = `Subtype: ` + (category.data.title || 'Unknown Subtype');
  card.appendChild(subtype);

  // Add id

  const id = document.createElement('a');
  id.title = `Category ID: ${category.data.id}`;
  id.className = 'category-id SPA-link'; // all links with SPA-link class will be handled by routes.js file
  id.href = `/category/${category.data.id}`;
  id.appendChild(document.createTextNode(`Category ID: ${category.data.id}`));
  infoWrapper.appendChild(id);

  card.appendChild(infoWrapper);

  return card
}


// Component to show a new artwork just fetched from the api
export function createNewArtwork(artwork, artwork_manifest= null) {
  var status = {};
  status.Ok = true;
  const card = document.createElement('div');
  card.className = 'artwork-latest'; // Styling will be in styles.css
  
  
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
  const imagewrapper = document.createElement('a');
  const image = document.createElement('img');
  imagewrapper.className = 'new-image-wrapper';
  imagewrapper.href = `/art/${artwork.id}`;
  image.className = 'card-img SPA-link'; // all links with SPA-link class will be handled by routes.js file
  
  
  if (!artwork.image) { // If the latest API data doesnt have an image set the OK status to false
    status.Ok = false; 
  }
  image.src = artwork.image || '/media/placeholder.jpg'; // Fallback image
  image.alt = 'Artwork';

  // encountered when server has an issue and cannot show the image, then replace the image with placeholder
  image.addEventListener('error', function handleError() {
    // console.log(image.parentElement);
    // image.parentElement.remove();
    console.log(image.src, 'not available from the ARTIC server. Fetching placeholder image.');
    image.src = '/media/placeholder.jpg';
    image.alt = 'default';    
  });
  
  // handles image redirects
  image.addEventListener('click', function routeURL() {
    window.history.pushState({}, "", `/art/${artwork.id}`);
    locationHandler();
      
  });

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);


  // Add title
  const title = document.createElement('a');
  title.title = artwork.title;
  title.className = 'card-title SPA-link';
  title.href = `/art/${artwork.id}`;
  title.appendChild(document.createTextNode(artwork.title));
  title.textContent = artwork.title || 'Untitled';
  card.appendChild(title);
  
  return [card, status];
}





// Component to create an artwork display
export function displayArtwork(artwork, artwork_manifest= null) {
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


// Component to create the art work of the day display
export function displayDayArtwork(artwork, artwork_manifest= null) {
  const card = document.createElement('div');
  card.className = 'artwork-day'; // Styling will be in styles.css
  
  card.style.backgroundImage = `linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6)),
    url(${artwork.image})`;

  // // handle cors errors from the server
  
  // handle image redirects
  // card.addEventListener('click', function routeURL() {
  //   window.history.pushState({}, "", `/art/${artwork.id}`);
  //   locationHandler();  });

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
  const artist = document.createElement('p');
  artist.className = 'day-artist';
  artist.textContent = `by: ${artwork.artists[0] || 'Unknown Artist'}`;
  infoWrapper.appendChild(artist);

  card.appendChild(infoWrapper);

  return card;
}



// Component to create an Artist Search Result
export function createArtistResult(data=null) {
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

// Component to create a category Search Result
export function createCategoryResult(data=null) {
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