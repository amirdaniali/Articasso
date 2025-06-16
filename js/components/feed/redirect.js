import {locationHandler} from "../../controller/routes/locationHandler.js";

// Component to go to feed
export function redirectFeed() {
  const card = document.createElement('div');
  card.style.background = `hsl(210, 100%, 70%)`;
  card.className = 'feed-handler-card'; // Styling will be in styles.css
  
  
  const imagewrapper = document.createElement('a');
  const image = document.createElement('img');
  imagewrapper.className = 'new-image-wrapper';
  imagewrapper.href = `/feed`;
  image.className = 'card-img SPA-link';
  image.src = '/media/redirect.png';
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