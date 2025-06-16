import {locationHandler} from "../../controller/routes/locationHandler.js";

// Component to go to Art Odyssey
export function redirectOdyssey() {
  const card = document.createElement('div');
  card.style.background = `hsl(210, 100%, 70%)`;
  card.className = 'odyssey-handler-card'; // Styling will be in styles.css
  
  
  const imagewrapper = document.createElement('a');
  const image = document.createElement('img');
  imagewrapper.className = 'odyssey-image-wrapper';
  imagewrapper.href = `/odyssey`;
  image.className = 'card-img SPA-link';
  image.src = '/media/redirect.png';
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


  



