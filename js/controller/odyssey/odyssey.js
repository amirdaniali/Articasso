import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

// Function to display odyssey page
export async function routeOdyssey(pageNumber = 1, itemsPerPage = 25) {
  let stateManager = new state.State();
  const artworksSection = document.getElementById('artworks');
  let loadMore;
  if (pageNumber > 1) {
    loadMore = document.getElementById('load-more-card');
    loadMore.remove();
  }


  try {
    const odysseyArtworks = stateManager.getArtOdysseyList(pageNumber, itemsPerPage);

    for (let index = 0; index < itemsPerPage; index++) {
      const id = odysseyArtworks[index]['ID'];
      const loader = components.loader();
      artworksSection.appendChild(loader);

      let artwork;
      let art_manifest;
      let olddata;
      let art_image;


      let artExists = await stateManager.hasItem("artworksStore", id);

      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await stateManager.getState("artworksStore", id);
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        artwork = await api.fetchArt(id, false);
        art_manifest = await api.fetchManifest(id);
        if (artwork.data.image_id) {
          art_image = api.fetchImage(artwork.data.image_id);
        } else {
          art_image = null;
        }
        let newData = {
          'art': artwork,
          'manifest': art_manifest,
          'image': art_image
        };
        stateManager.addItem("artworksStore", id, newData);
      }

      const [card, status] = components.smallCard({
        title: artwork.data.title,
        image: art_image,
        id: id,
        href: `art/${id}`,
        color: artwork.data.color,
      });

      artworksSection.removeChild(loader);

      if (status.Ok == true) {
        artworksSection.appendChild(card);
      }

    }
    if (document.querySelectorAll('.small-card').length < 420) {
      loadMore = components.moreOdysseyButton();
      artworksSection.appendChild(loadMore);
    }


  }

  catch (error) {
    // Remove the loader
    console.log('Error:', error);
    const errorMessage = components.errorMessage(`Problem Fetching New Arts.`);
    artworksSection.appendChild(errorMessage);
  }
}