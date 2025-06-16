import { processArtSearch } from './artSearch.js';
// Logic for loading more search results via a load more button
export function processMoreArtSearch() {
    let search_term = document.getElementById('search-bar').value.trim();
    let nextPage = Math.ceil(document.querySelectorAll('.small-card').length / 50) + 1;
    processArtSearch(search_term, nextPage, 50); // Load next batch of 50 cards
}