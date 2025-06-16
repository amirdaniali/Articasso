import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

// Function to display artist pages
export async function processArtistPage(id, pageNumber = 1, itemsPerPage = 50) {

  const artistGrid = document.getElementById('artist-grid');
  const artistInfo = document.getElementById('artist-info');

  let loadMore; // load more is a button at the end of the div that loads more elements. we delete it to avoid dups 
  if (pageNumber > 1) {
    loadMore = document.getElementById('load-more-card');
    loadMore.remove();
  }
  try {
    // Create a loader while fetching data
    const artist = await api.fetchArtist(id);
    // const artist_artworks = await find_artist_id_arts(artist.data.id,pageNumber,itemsPerPage);
    const artist_artworks = await api.searchArtistArts(artist.data.title, pageNumber, itemsPerPage);
    const loader = components.loader();
    if (pageNumber == 1) {


      const card = components.artistInformation(artist);
      artistInfo.appendChild(card);

      document.title = artist.data.title || 'View Artist';

      // load art made by artist section. 
      if (artist_artworks.data.length) {
        const artist_arts_header = document.createElement('h2');
        artist_arts_header.className = 'artist-arts-header';
        artist_arts_header.textContent = `Here are the arts created by this artist:`;
        artistInfo.appendChild(artist_arts_header);
      }
    }

    let stateManager = new state.State();

    for (let index = 0; index < artist_artworks.data.length; index++) {

      artistGrid.appendChild(loader);

      let artwork = artist_artworks.data[index];
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
        art_data = await api.fetchArt(art_id, false);

        if (art_data.data.image_id) {
          art_image = api.fetchImage(art_data.data.image_id);
          art_manifest = await api.fetchManifest(art_id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        stateManager.addItem("artworksStore", String(artwork.id),
          {
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
      }, art_manifest
      );

      artistGrid.removeChild(loader);

      if (status.Ok == true) {
        artistGrid.appendChild(card);
      }
    }
    loadMore = components.moreArtistButton();
    artistGrid.appendChild(loadMore);
  }
  catch (error) {
    console.log('Error:', error);
    const errorMessage = components.errorMessage(`Invalid Artist ID. The Artic Database has no artist with id: ${id}`);
    artistInfo.appendChild(errorMessage);
  }
}