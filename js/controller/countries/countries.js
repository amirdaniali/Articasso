import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import * as api from '../../api/index.js';

// Function to display countries page
export async function routeCountries(pageNumber=1, itemsPerPage=25) {
  let stateManager = new state.persistentState();

  const countriesSection = document.getElementById('countries');
  let loadMore;
  if (pageNumber > 1){
    loadMore = document.getElementById('load-more-card');
    loadMore.remove();
  }
  
  try {
    const pageData =  await stateManager.getCountriesPage(pageNumber,itemsPerPage);

  const loader = components.loader();

  for (let index = 0; index < itemsPerPage; index++) {
      const country = pageData[index];
      countriesSection.appendChild(loader);

      let country_name = country['name'];
      let art_id = country['artic_art_id'];
      // let artwork = await api.fetchArt(art_id);
      let art_image = api.fetchImage(country['artic_image']);

      const [card, status] = components.smallCard({
        title: country_name,
        image: art_image,
        href: `category/${country['artic_id']}`,
        // color: artwork.color,
      }
    );
    
    countriesSection.removeChild(loader);
      
      if (status.Ok == true) { 
        countriesSection.appendChild(card);
      }
      
    }
    if (document.querySelectorAll('.small-card').length < 85) {
      loadMore = components.moreCountriesButton();
      countriesSection.appendChild(loadMore);
    }
 
  }
          
    catch (error) {
      console.log('Error:', error);
      const errorMessage = components.errorMessage(`Problem Fetching New Arts.`);
      countriesSection.appendChild(errorMessage);
    }
}