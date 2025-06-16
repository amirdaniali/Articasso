import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

// Function to display artwork of day cards 
export async function processDaySection() {
  const artSection = document.getElementById('art-of-the-day');
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const today = Math.floor(diff / oneDay);

  let stateManager = new state.State();
  const id = stateManager.getDayArtWorkID(today);
  // Create a loader while fetching data
  const loader = components.loader();
  artSection.appendChild(loader);

  try {
    let artwork;
    let art_manifest;
    let olddata;
    let art_image;

    let artExists = await stateManager.hasItem("artworksStore", String(id));
    if (artExists) { // We have loaded the artwork before, no need to make a fetch request
      olddata = await stateManager.getState("artworksStore", String(id));
      artwork = olddata['art'];
      art_manifest = olddata['manifest'];
      art_image = olddata['image'];
    }
    else { // Fetch artwork data
      artwork = await api.fetchArt(id, false);
      art_manifest = await api.fetchManifest(id);
      if (artwork.data.image_id) {
        art_image = api.fetchImage(artwork.data.image_id)
      } else {
        art_image = null;
      }
      let newData = {
        'art' : artwork,
        'manifest': art_manifest,
        'image': art_image
      };
      stateManager.addItem("artworksStore", String(id), newData);
    } 

  
  // Remove the loader
  artSection.removeChild(loader);

  // Create an artwork card and add it to the DOM
  const card = components.dayHeader({
    title: artwork.data.title,
    artists: artwork.data.artist_titles,
    image: art_image,
    id:artwork.data.id,
    color: artwork.data.color,
  }, art_manifest);
  artSection.appendChild(card);


  } catch (error) {
    // Remove the loader
    artSection.removeChild(loader);
    console.log('Error:', error);
    const errorMessage = components.errorMessage(`Invalid ID. The Artic Database has no art with id: ${id}`);
    artSection.appendChild(errorMessage);
  }

}
