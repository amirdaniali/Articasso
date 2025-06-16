import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

export async function processCategoryPage(id, pageNumber = 1, itemsPerPage = 50) {

  const categoryGrid = document.getElementById('category-grid');
  const categoryInfo = document.getElementById('category-info');

  let loadMore; // load more is a button at the end of the div that loads more elements. we delete it to avoid dups 
  if (pageNumber > 1) {
    loadMore = document.getElementById('load-more-card');
    loadMore.remove();
  }
  try {
    const category = await api.fetchCategory(id);
    const category_artworks = await api.searchCategoryArts(category.data.title, pageNumber, itemsPerPage);
    let loader = components.loader();
    if (pageNumber == 1) {
      const card = components.categoryInformation(category);
      categoryInfo.appendChild(card);
      document.title = category.data.title || 'View Category';

      // load art in the category
      if (category_artworks.data.length) {
        const category_arts_header = document.createElement('h2');
        category_arts_header.className = 'category-arts-header';
        category_arts_header.textContent = `Here are the arts with this category:`;
        categoryInfo.appendChild(category_arts_header);
      }
    }

    let stateManager = new state.State();

    for (let index = 0; index < category_artworks.data.length; index++) {

      categoryGrid.appendChild(loader);

      let artwork = category_artworks.data[index];
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
        art_manifest = await api.fetchManifest(art_id);

        if (art_data.data.image_id) {
          art_image = api.fetchImage(art_data.data.image_id);
        } else {
          art_image = null;
        }
        let newData = {
          'art': art_data,
          'manifest': art_manifest,
          'image': art_image
        };
        stateManager.addItem("artworksStore", String(artwork.id), newData);
      }

      let [card, status] = components.smallCard({
        title: art_data.data.title,
        image: art_image,
        id: art_data.data.id,
        href: `art/${art_data.data.id}`,
        color: art_data.data.color,
      }
      );

      categoryGrid.removeChild(loader);

      if (status.Ok == true) {
        categoryGrid.appendChild(card);
      }
    }

    loadMore = components.moreCategoryButton();
    categoryGrid.appendChild(loadMore);
  }

  catch (error) {
    console.log('Error:', error);
    const errorMessage = components.errorMessage(`Invalid Category ID. The Artic database has no category with id: ${id}`);
    categoryInfo.appendChild(errorMessage);
  }
}