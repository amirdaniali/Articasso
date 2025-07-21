import {locationHandler} from "../../controller/routes/locationHandler.js";
import { truncate_string } from "../../utilities/truncate.js";

// Component to show small cards with minimum details
export function smallCard(data) {
  var status = {};
  status.Ok = true;
  const card = document.createElement('div');
  card.className = 'small-card'; // Styling will be in styles.css
  
  
  // Change the backgroud color if image colors are available

  try {
    if (data.color.l > 40){
      card.style.background = `hsl(${data.color.h},${data.color.s}%,${data.color.l}%)`;
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
  imagewrapper.className = 'small-image-wrapper';
  imagewrapper.href = `/${data.href}`;
  image.className = 'card-img SPA-link'; // all links with SPA-link class will be handled by routes.js file
  
  
  if (!data.image) { // If the latest API data doesnt have an image set the OK status to false
    status.Ok = false; 
  }
  image.src = data.image || '/media/placeholder.jpg'; // Fallback image
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
    window.history.pushState({}, "", `/${data.href}`);
    locationHandler();
      
  });

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);


  // Add title
  const title = document.createElement('a');
  title.title = truncate_string( data.title, 30 );
  title.className = 'card-title SPA-link';
  title.href = `//${data.href}`;
  title.appendChild(document.createTextNode(truncate_string( data.title, 30 )));
  title.textContent = truncate_string( data.title, 30 ) || 'Untitled';
  card.appendChild(title);
  
  return [card, status];
}
