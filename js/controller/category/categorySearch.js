import * as components from '../../components/index.js';
import * as api from '../../api/index.js';

// Function to display category Search Results
export async function processCategorySearch(search_term) {

  let loader = components.loader();
  const categorySection = document.getElementById('category-grid');
  try {

    // Capitalize each word
    document.title = ('Search Category: ' + search_term.replace(/\b\w/g, (c) => c.toUpperCase())) || 'Search Category'; 
    const searchresults = await api.searchCategories(search_term);
    
    for (let index = 0; index < searchresults.data.length; index++) {
         
      let category = searchresults.data[index];
      categorySection.appendChild(loader);

      let card = components.categoryResult(category);

      categorySection.removeChild(loader);
      categorySection.appendChild(card);
    
      }}
    catch (error) {
    // Handle errors and show a message
    
    console.error(error);
    const errorMessage = components.errorMessage('Failed to search artists.');
    categorySection.appendChild(errorMessage);
  }
}