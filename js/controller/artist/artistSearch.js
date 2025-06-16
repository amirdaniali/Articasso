
import * as components from '../../components/index.js';
import * as api from '../../api/index.js';

// Function to display artist Search Results
export async function processArtistSearch(search_term) {
  const artistsSection = document.getElementById('artist-grid');
  try {
    let loader = components.loader();

    // Capitalize each word
    document.title = ('Search Artist: '+search_term.replace(/\b\w/g, (c) => c.toUpperCase())) || 'Search Artist';
    const searchresults = await api.searchArtists(search_term);
      
    for (let index = 0; index < searchresults.data.length; index++) {
      artistsSection.appendChild(loader);
      
      let artist = searchresults.data[index];
      let card = components.artistResult(artist);

      artistsSection.removeChild(loader);
      artistsSection.appendChild(card);
      
      }}
    catch (error) {
    // Handle errors and show a message
    
    console.error(error);
    const errorMessage = components.errorMessage('Failed to search artists.');
    artistsSection.appendChild(errorMessage);
  }
}