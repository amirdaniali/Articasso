import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

// Function to display artwork Search Results
export async function processArtSearch(search_term, pageNumber = 1, itemsPerPage = 50) {
  const artworksSection = document.getElementById('artworks');
  let loadMore; // load more is a button at the end of the div that loads more elements. we delete it to avoid dups 
  if (pageNumber > 1) {
    loadMore = document.getElementById('load-more-card');
    loadMore.remove();
  }

  try {
    let stateManager = new state.State();
    let loader = components.loader();

    // Capitalize each word
    document.title = ('Search Art: ' + search_term.replace(/\b\w/g, (c) => c.toUpperCase())) || 'Search Art';
    const searchresults = await api.searchArts(search_term, pageNumber, itemsPerPage);

    for (let index = 0; index < searchresults.data.length; index++) {
      artworksSection.appendChild(loader);

      let artwork = searchresults.data[index];
      let art_id = artwork.id;
      let art_manifest;
      let olddata;
      let art_image;
      let art_data;


      let artExists = await stateManager.hasItem("artworksStore", String(art_id));
      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await stateManager.getState("artworksStore", String(art_id));
        art_data = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        art_data = await api.fetchArt(art_id);

        if (art_data.data.image_id) {
          art_image = api.fetchImage(art_data.data.image_id);
          art_manifest = await api.fetchManifest(art_id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        stateManager.addItem("artworksStore", String(art_id), {
          'art': art_data,
          'manifest': art_manifest,
          'image': art_image
        })
      }

      let [card, status] = components.smallCard({
        title: art_data.data.title,
        image: art_image,
        id: art_data.data.id,
        href: `art/${art_data.data.id}`,
        color: art_data.data.color,
      });

      artworksSection.removeChild(loader);

      if (status.Ok == true) {
        artworksSection.appendChild(card);
      }
    }

    loadMore = components.moreSearchButton();
    artworksSection.appendChild(loadMore);

  }
  catch (error) {
    // Handle errors and show a message

    console.error(error);
    const errorMessage = components.errorMessage('Failed to search artworks.');
    artworksSection.appendChild(errorMessage);
  }
}