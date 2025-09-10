import * as controller from '../index.js';
import { URLroutes } from "./urlRoutes.js";

export async function locationHandler() {

    controller.handleRouteChange();
    let location = window.location.pathname; // get the url path
    
    // curent view will have this format ['art', {art_id}] where the first index is which page has to be rendered and index 1 is filled if the user demanded an specific id. 
    let currentView = ['/',''] 
    
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }   else{ 
        currentView = location.split('/');
        currentView.splice(0, 1);
    }

    // get the route object from the routes object
    const route = URLroutes[currentView[0]] || URLroutes["404"];

    // get the html from the template
    const html = await fetch(route.template).then((response) => response.text());
    if (currentView[0] == 'art') {
        document.getElementById("page-container").innerHTML = html; // Only for the art page for special styling
    }   else {
        document.getElementById("main-container").innerHTML = html; // All other routes use the main container.       
    }
  
    if (currentView[0]=='') controller.routeHome();
    else if (currentView[0]=='art')  controller.routeArt(currentView[1]);
    else if (currentView[0]=='artist')  controller.routeArtist(currentView[1]);
    else if (currentView[0]=='category')  controller.routeCategory(currentView[1]);
    else if (currentView[0]=='feed')  controller.routeFeed();
    else if (currentView[0]=='odyssey')  controller.routeOdyssey();
    else if (currentView[0]=='countries')  controller.routeCountries();
    else if (currentView[0]=='art_search')  controller.routeArtSearch();
    else if (currentView[0]=='artist_search')  controller.routeArtistSearch();
    else if (currentView[0]=='category_search')  controller.routeCategorySearch();
    else if (currentView[0]=='about')  {}
    else {
        window.location.pathname = '/';
    }
};

