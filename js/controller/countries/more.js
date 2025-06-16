import { routeCountries } from './countries.js';

// Logic for loading more countries via a load more button
export function processMoreCountries() {
    let nextPage = Math.ceil(document.querySelectorAll('.small-card').length / 25) + 1;
    routeCountries(nextPage, 25); // Load next batch of 25 cards
}