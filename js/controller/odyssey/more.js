import { routeOdyssey } from './odyssey.js';

// Logic for loading more feed data via a load more button
export function processMoreOdyssey() {
    let nextPage = Math.ceil(document.querySelectorAll('.small-card').length / 25) + 1;
    routeOdyssey(nextPage, 25); // Load next batch of 25 cards
}
