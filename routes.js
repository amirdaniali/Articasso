import { createErrorMessage } from './components.js';
import {test_ids, displayArtworkPage, populatePage, displayArtist, displayCategory, displayCuratedlist, displayArtworkofDay } from './app.js';


// In order to remember where the user has been before and what they have done we store this variable
// Format {url: [url_state1, url_state2,...]}
export var previousStates = { 
    'art': [],
    'artist': [],
    'category': []
}

// These routes are the pagess the application will be able to redirect to. Otherwise 404 will kick in. 
const routes = {
    404: {
        template: "/routes/index.html",
        title: "Artic Arts Home",
        description: "This is the home page",
    },
    "": {
        template: "/routes/index.html",
        title: "Artic Arts Home",
        description: "This is the home page",
    },
    'about': {
        template: "/routes/about.html",
        title: "About",
        description: "This is the about page",
    },
    'art': {
        template: "/routes/art.html",
        title: "View Art",
        description: "This is the art page",
    },
    'artist': {
        template: "/routes/artist.html",
        title: "View Artist",
        description: "This is the artist page",
    },
    'category': {
        template: "/routes/category.html",
        title: "Art Category",
        description: "This is the category page",
    },
};


const route = (event) => {
    event = event || window.event; // get window.event if event argument not provided
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
    locationHandler();
};

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
    if (e.explicitOriginalTarget.className.includes("explicit-outbound") ){
        e.preventDefault();
        route();
    }

    
});


export async function locationHandler() {

    const location = window.location.pathname; // get the url path
    
    
    // curent view will have this format ['art', {art_id}] where the first index is which page has to be rendered and index 1 is filled if the user demanded an specific id. 
    let currentView = ['/',''] 
    
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }

    else{ 
        currentView = location.split('/');
        currentView.splice(0, 1);
    }
    
    // get the route object from the routes object
    const route = routes[currentView[0]] || routes["404"];
    // get the html from the template
    const html = await fetch(route.template).then((response) => response.text());
    // set the content of the content div to the html
    

    // prepare the wrapper section and remove the current view
    document.getElementById("page-container").innerHTML = '';
    document.getElementById("main-container").innerHTML = '';
    if (currentView[0] == 'art') {
        document.getElementById("page-container").innerHTML = html; // Only for the art page for special styling

    }
    else {
        document.getElementById("main-container").innerHTML = html; // All other routes use the main container.

        
    }

    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
  

    
    switch (currentView[0]) {
        case '':
            displayArtworkofDay();
            populatePage();
            displayCuratedlist();
            break;

        case 'art':
            // DOM Elements
            const artworksSection = document.getElementById('artworks');
            const searchBar = document.getElementById('search-bar');
            const searchButton = document.getElementById('search-button');
            
            if (currentView[1]) { // user has clicked an explicit-outbound link, show the proper artwork
                artworksSection.innerHTML = '';
                previousStates['art'].push(currentView[1]);
                searchBar.defaultValue = currentView[1];
                try {
                    await displayArtworkPage(currentView[1]); // Display artwork card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${currentView[1]}`);
                    artworksSection.appendChild(errorMessage);
                }
            } else { 
                if (previousStates['art'].length > 0) { // user hasn't clicked any artwork but has previously seen an artwork
                    artworksSection.innerHTML = '';
                    searchBar.defaultValue = previousStates['art'].slice(-1)[0];
                    try {
                        await displayArtworkPage(searchBar.defaultValue); // Display artwork card
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${previousStates['art'].slice(-1)[0]}`);
                        artworksSection.appendChild(errorMessage);
                        
                    }}
                    else { // This is the first time user is clicking the artwork page
                        searchBar.placeholder = "Artwork ID";
                        artworksSection.innerHTML = '';
                        const information = document.createElement('div');
                        information.className = 'display-information';
                        information.innerHTML = 'Enter a unique Artwork ID in the field above to view the artwork information. <br> You can also click on an artwork in the Home page to view the details for each art.';
                        artworksSection.appendChild(information);
            }}
            

            searchButton.addEventListener('click', async () => {
                // Clear any existing content
                artworksSection.innerHTML = '';
            
                const searchValue = searchBar.value.trim();
                if (searchValue === '') {
                const errorMessage = createErrorMessage('Please enter an ID to search.');
                artworksSection.appendChild(errorMessage);
                return;
                }
            
                // Display either an artwork card or a post based on the entered ID
                const id = parseInt(searchValue, 10);
            
                if (isNaN(id)) {
                const errorMessage = createErrorMessage('Invalid ID. Please enter a numeric value.');
                artworksSection.appendChild(errorMessage);
                } else {
                
                try {
                    await displayArtworkPage(id); // Display artwork card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${id}`);
                    artworksSection.appendChild(errorMessage);
                    return 
                }

                window.history.replaceState = `/art/${id}`;
                }
            });
            
                        
            // Execute a function when the user presses a key on the keyboard
                searchBar.addEventListener("keypress", function(event) {
                    // If the user presses the "Enter" key on the keyboard
                    if (event.key === "Enter") {
                    // Cancel the default action, if needed
                    event.preventDefault();
                    // Trigger the button element with a click
                    console.log('Pressed Button with Enter');
                    searchButton.click();
                }}); 
                
                break;
            
        case 'artist':

            // DOM Elements
            const artistGrid = document.getElementById('artist-grid');
            const artistSearch = document.getElementById('search-bar');
            const ArtistSearchButton = document.getElementById('search-button');
            const artistInfo = document.getElementById('artist-info');  
            
            if (currentView[1]) { // user has clicked an explicit-outbound link and needs to be shown the artist
                artistInfo.innerHTML = '';
                artistGrid.innerHTML = '';
                previousStates['artist'].push(currentView[1]);
                artistSearch.defaultValue = currentView[1];
                try {
                    await displayArtist(currentView[1]); // Display artist card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid Artist ID. The Artic Database has no artist with id: ${currentView[1]}`);
                    artistInfo.appendChild(errorMessage);
                }
            } else {
                if (previousStates['artist'].length > 0) { // user hasn't requested an artist but has previously seen one
                    artistInfo.innerHTML = '';
                    artistSearch.defaultValue = previousStates['artist'].slice(-1)[0];
                    try {
                        await displayArtist(artistSearch.defaultValue); // Display artist card previously shown
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${previousStates['artist'].slice(-1)[0]}`);
                        artistInfo.appendChild(errorMessage);
                    }}
                    else {  // user hasn't been to this page before. show the welcome information.
                        ArtistSearchButton.placeholder = "Artist ID";
                        artistInfo.innerHTML = '';
                        const information = document.createElement('div');
                        information.className = 'display-information';
                        information.innerHTML = 'Enter an Artist ID in the field above to view the artist information. <br> You can also click on an artist link in the description of a any artwork you like.  ';
                        artistInfo.appendChild(information);
                    }}
            

            ArtistSearchButton.addEventListener('click', async () => {
                // Clear any existing content
                artistGrid.innerHTML = '';
                artistInfo.innerHTML = '';

            
                const searchValue = artistSearch.value.trim();
                if (searchValue === '') {
                    const errorMessage = createErrorMessage('Please enter an ID to search.');
                    artistInfo.appendChild(errorMessage);
                    return;
                }
            
                // Display either an artwork card or a post based on the entered ID
                const id = parseInt(searchValue, 10);                
                try {
                    await displayArtist(id); // Display artwork card
                    previousStates['artist'].push(id);

                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid Artist ID. The Artic Database has no artist with id: ${id}`);
                    artistInfo.appendChild(errorMessage);

                }
                
                
                window.history.replaceState = `/artist/${id}`;
                
                }
            );
            
            
            // Execute a function when the user presses a key on the keyboard
            artistSearch.addEventListener("keypress", function(event) {
                    // If the user presses the "Enter" key on the keyboard
                    if (event.key === "Enter") {
                    // Cancel the default action, if needed
                    event.preventDefault();
                    // Trigger the button element with a click
                    console.log('Pressed Button with Enter');
                    artistSearch.click();
                }}); 
                
                break;
                
        case 'about':
                break;

        case 'category':

            // DOM Elements
            const categoryGrid = document.getElementById('category-grid');
            const categoryInfo = document.getElementById('category-info');
            const categorySearch = document.getElementById('search-bar');
            const categorySearchButton = document.getElementById('search-button');
            
            if (currentView[1]) { // try to show category id if user clicked on a link
                categoryInfo.innerHTML = '';
                categorySearch.defaultValue = currentView[1];
                previousStates['category'].push(currentView[1]);
                try {
                    await displayCategory(currentView[1]); // Display category card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid Category ID. The Artic Database has no category with id: ${currentView[1]}`);
                    categoryInfo.appendChild(errorMessage);
                }
            } else { // If user has visited any valid category before switching to other tabs show it instead 
                if (previousStates['category'].length > 0) {
                    categoryInfo.innerHTML = '';
                    categorySearch.defaultValue = previousStates['category'].slice(-1)[0];
                    try {
                        await displayCategory(categorySearch.defaultValue); // Display category card shown before
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no category with id: ${previousStates['category'].slice(-1)[0]}`);
                        categoryInfo.appendChild(errorMessage);
                    }}
                else { // user hasn't visited categories tabs before, show placeholder.
                    categorySearch.placeholder = "Category ID";
                    categoryInfo.innerHTML = '';
                    const information = document.createElement('div');
                    information.className = 'display-information';
                    information.innerHTML = 'Enter a Category ID in the field above to view the category information. <br> You can also click on a category in the description of any art work that has one. ';
                    categoryInfo.appendChild(information);
            }}
            

            categorySearchButton.addEventListener('click', async () => {
                // Clear any existing content
                categoryGrid.innerHTML = '';
                categoryInfo.innerHTML = '';


                const searchValue = categorySearch.value.trim();
                if (searchValue === '') {
                const errorMessage = createErrorMessage('Please enter an ID to search.');
                categoryInfo.appendChild(errorMessage);
                return;
                }
            
                // Display either an artwork card or a post based on the entered ID
                const id = searchValue;
                
                try {
                    await displayCategory(id); // Display artwork card
                    previousStates['category'].push(id);


                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid category ID. The Artic Database has no artist with id: ${id}`);
                    categoryInfo.appendChild(errorMessage);

                }
                
                window.history.replaceState = `/category/${id}`;
                
                }
            );
            
           
            // Execute a function when the user presses a key on the keyboard
            categorySearch.addEventListener("keypress", function(event) {
                    // If the user presses the "Enter" key on the keyboard
                    if (event.key === "Enter") {
                    // Cancel the default action, if needed
                    event.preventDefault();
                    // Trigger the button element with a click
                    categorySearchButton.click();
                }}); 

                break;
        default:
                window.location.pathname = '/';
                console.log('404 Encountered')
                break;
    }
};



// call the urlLocationHandler to load the page
locationHandler();
window.onpopstate = locationHandler;
window.route = route;