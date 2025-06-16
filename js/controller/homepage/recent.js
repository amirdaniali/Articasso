import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

// Feed is one of the first sections the user sees in the homepage. 
// Don't mistake this for displayFeedPage; that one loads the feed page
// This function just loads the homepage part
export async function processRecentsSection(limit=24) {
  const newArtsSection = document.getElementById('new-arts');
  
  try {
    const newArtworks = await api.fetchRecentArts(limit);
    let stateManager = new state.State();

    for (let index = 0; index < limit; index++) {
      const element = newArtworks.data[index];
      const loader = components.loader();
      newArtsSection.appendChild(loader);

      let art_manifest;
      let olddata;
      let art_image;
      let artwork;

      let artExists = await stateManager.hasItem("artworksStore", String(element.id));

      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await stateManager.getState("artworksStore", String(element.id));
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        art_manifest = await api.fetchManifest(element.id);
        if (element.image_id) {
          art_image = api.fetchImage(element.image_id);
        } else {
          art_image = null;
        }
        let newData = {
          'art' : element,
          'manifest': art_manifest,
          'image': art_image
        };
        newData.art.data = element;
        stateManager.addItem("artworksStore", String(element.id), newData);
      } 

      const [card, status] = components.recentCard({
        title: element.title,
        artists: element.artist_titles,
        image: art_image,
        id: element.id,
        color: element.color,
      }, art_manifest
    );
    
    newArtsSection.removeChild(loader);
      
      if (status.Ok == true) { 
        newArtsSection.appendChild(card);
      }
      
    }
      const feedHandler = components.redirectFeed();
      newArtsSection.appendChild(feedHandler);

  }
          
    catch (error) {
      console.log('Error:', error);
      const errorMessage = components.errorMessage(`Problem Fetching New Arts.`);
      newArtsSection.appendChild(errorMessage);
    }
  
}