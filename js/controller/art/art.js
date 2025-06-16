import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

// Function to display artwork pages
export async function processArtPage(id) {
  const artworksSection = document.getElementById('artworks');
  const artInfo = document.getElementById('art-info');
  // Create a loader while fetching data
  const loader = components.loader();
  artworksSection.appendChild(loader);
  try {
    let stateManager = new state.State();
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
        'art': artwork,
        'manifest': art_manifest,
        'image': art_image
      };
      stateManager.addItem("artworksStore", String(id), newData); // add the data to the stateManager 
    }

    // Remove the loader
    document.title = artwork.data.title || 'View Art';
    artworksSection.removeChild(loader);

    // Create an artwork card and add it to the DOM
    const card = components.artPage({
      title: artwork.data.title,
      artists: artwork.data.artist_titles,
      arists_links: artwork.data.artist_ids,
      image: art_image,
      id: artwork.data.id,
      date: artwork.data.date_display,
      description: artwork.data.short_description,
      history: artwork.data.exhibition_history,
      color: artwork.data.color,
      categories: artwork.data.category_titles,
      category_links: artwork.data.category_ids,
    }, art_manifest);
    artworksSection.appendChild(card);


  } catch (error) {
    console.log('Error:', error);
    const errorMessage = components.errorMessage(`Cannot find the id in the Artic Database.`);
    artworksSection.appendChild(errorMessage);
  }
}