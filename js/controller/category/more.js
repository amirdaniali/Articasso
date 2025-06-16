import { processCategoryPage } from './category.js';

// Logic for loading more artists art data via a load more button
export function processMoreCategory() {
    let search_term = document.getElementById('search-bar').value.trim();
    let nextPage = Math.ceil(document.querySelectorAll('.small-card').length / 50) + 1;
    processCategoryPage(search_term, nextPage, 50); // Load next batch of 50 cards
}