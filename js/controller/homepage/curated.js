import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

export async function processCuratedSection() {
  const curatedArtsSection = document.getElementById('curated-arts');

  // I went through a lot of art in my free time and these are my favourites. 
  const curated_ids = [
    49686,
    15563,
    11723,
    86385,
    27992,
    14572,
    129884,
    5580,
    31816,
    187528,
    55494,
    64729,
    151108,
    16488,
    14598,
    4884,
    45418,
    80084,
    61428,
    28067,
  ];

  let loader = components.loader();
  let stateManager = new state.State();

  // Display an artwork for each id
  try {
    for (let index = 0; index < curated_ids.length; index++) {
      curatedArtsSection.appendChild(loader);

      let art_id = curated_ids[index];
      let artwork;
      let art_manifest;
      let olddata;
      let art_image;

      let artExists = await stateManager.hasItem("artworksStore", String(art_id));
      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await stateManager.getState("artworksStore", String(art_id));
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        artwork = await api.fetchArt(art_id, false);

        if (artwork.data.image_id) {
          art_image = api.fetchImage(artwork.data.image_id);
          art_manifest = await api.fetchManifest(art_id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        let newData = {
          'art': artwork,
          'manifest': art_manifest,
          'image': art_image
        };
        stateManager.addItem("artworksStore", String(art_id), newData);
      }

      const card = components.bigCard({
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

      curatedArtsSection.removeChild(loader);
      curatedArtsSection.appendChild(card);
    }

    const odysseyHandler = components.redirectOdyssey();
    curatedArtsSection.appendChild(odysseyHandler);

  }

  catch (error) {
    console.log('Error:', error);
  }

}