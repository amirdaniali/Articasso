import { URLroutes } from "./urlRoutes.js";

export function handleRouteChange(){
    let location = window.location.pathname; // get the url path
    // curent view will have this format ['art', {art_id}] where the first index is which page has to be rendered
    // index 1 is filled if the user demanded an specific id. 
    
    let currentView = ['/', ''] 
    let route = URLroutes[currentView[0]] || URLroutes["404"];
    
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }   else{ 
        currentView = location.split('/');
        currentView.splice(0, 1);
    }
    
    // set the content of the content div to the html
    document.getElementById("page-container").innerHTML = '';
    document.getElementById("main-container").innerHTML = '';
    // prepare the wrapper section and remove the current view

    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);

}