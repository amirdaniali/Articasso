import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

// Function to display the feed page and it works by adding buttons that load more data. 
export async function routeFeed(pageNumber = 1, itemsPerPage = 25) {
  const newArtsSection = document.getElementById('new-arts');
  let loadMore; // load more is a button at the end of the div that loads more elements. we delete it to avoid dups 
  if (pageNumber > 1){
    loadMore = document.getElementById('load-more-card');
    loadMore.remove();
  }
  
  try {
    const newArtworks = await api.fetchRecentArts(itemsPerPage, pageNumber);
    let stateManager = new state.persistentState();

    for (let index = 0; index < itemsPerPage; index++) {
      const element = newArtworks.data[index];
      const loader = components.loader();
      newArtsSection.appendChild(loader);

      let artwork;
      let art_manifest;
      let olddata;
      let art_image;

      let artExists = await stateManager.hasItem("artworksStore", String(element.id));

      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await stateManager.getState("artworksStore", String(element.id));
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        art_manifest = await api.fetchManifest(element.id);
        if (element.image_id) art_image = api.fetchImage(element.image_id);
        else art_image = null;

        let newData = {
          'art' : element,
          'manifest': art_manifest,
          'image': art_image
        };
        newData.art.data = element;
        stateManager.addItem("artworksStore", String(element.id), newData);
      } 


      
    let [card, status] = components.recentCard({
      title: element.title,
      image: art_image,
      id: element.id,
      short_description: element.short_description,
      color: element.color,
    }, art_manifest
    );
    
    newArtsSection.removeChild(loader);
      
      if (status.Ok == true) { 
        newArtsSection.appendChild(card);
      }
      
    }
    
      loadMore = components.moreFeedButton();
      newArtsSection.appendChild(loadMore);
 
  }
          
    catch (error) {
      // Remove the loader
      console.log('Error:', error);
      const errorMessage = components.errorMessage(`Problem Fetching New Arts.`);
      newArtsSection.appendChild(errorMessage);
    }
}