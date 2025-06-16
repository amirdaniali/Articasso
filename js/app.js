import * as controller from './controller/index.js';

document.addEventListener("click", (e) => {
    if (e.target.className.includes("SPA-link")) { // Internal Links to SPA pages
        e.preventDefault();
        route(e);
    }
    if (e.target.className.includes("feed-button-title")) { // Feed loadmore button
        e.preventDefault();
        controller.processMoreFeed();
    }
    if (e.target.className.includes("feed-button-image")) { // Feed loadmore image
        e.preventDefault();
        controller.processMoreFeed();
    }
    if (e.target.className.includes("odyssey-button-title")) { // odyssey loadmore button
        e.preventDefault();
        controller.processMoreOdyssey();
    }
    if (e.target.className.includes("odyssey-button-image")) { // odyssey loadmore image
        e.preventDefault();
        controller.processMoreOdyssey();
    }
    if (e.target.className.includes("category-button-title")) { // category loadmore button
        e.preventDefault();
        controller.processMoreCategory();
    }
    if (e.target.className.includes("category-button-image")) { // category loadmore image
        e.preventDefault();
        controller.processMoreCategory();
    }
    if (e.target.className.includes("artist-button-title")) { // artist loadmore button
        e.preventDefault();
        controller.processMoreArtist();
    }
    if (e.target.className.includes("artist-button-image")) { // artist loadmore image
        e.preventDefault();
        controller.processMoreArtist();
    }
    if (e.target.className.includes("search-button-title")) { // art search loadmore button
        e.preventDefault();
        controller.processMoreArtSearch();
    }
    if (e.target.className.includes("search-button-image")) { // art search loadmore image
        e.preventDefault();
        controller.processMoreArtSearch();
    }
    if (e.target.className.includes("countries-button-image")) { // countries loadmore button
        e.preventDefault();
        controller.processMoreCountries();
    }
    if (e.target.className.includes("countries-button-title")) { // countries loadmore image
        e.preventDefault();
        controller.processMoreCountries();
    }
    if (e.target.className.includes("nav-group")) { // Navgroup click shouldn't refresh pages
        e.preventDefault();
    }
});

document.addEventListener("touchstart", function () { }, true);
const route = controller.eventRoute

// call the urlLocationHandler to load the page
await controller.locationHandler();
window.onpopstate = controller.locationHandler;
window.route = route;



