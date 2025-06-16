import { routeFeed } from './feedPage.js';

// Logic for loading more feed data via a load more button
export function processMoreFeed() {
    let nextPage = Math.ceil(document.querySelectorAll('.artwork-latest').length / 25) + 1;
    // console.log(nextPage);
    routeFeed(nextPage, 25); // Load next batch of 25 cards
}