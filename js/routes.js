import { 
    displayArtist,
    displayFeedPage,
    displayCategory,
    displayRecentFeed,
    displayCuratedlist,
    displayArtworkPage,
    displayOdysseyPage,
    displayArtistSearch,
    displayArtworkofDay,
    displayArtworkSearch,
    displayCategorySearch } from './app.js';

import { createErrorMessage } from './components.js';

import { State } from './state.js'


// These routes are the pagess the application will be able to redirect to. Otherwise 404 will kick in. 
// The title and description fields will be updated with javascript for all SPA routes.
const routes = {
    404: {
        template: "/routes/index.html",
        title: "Articasso",
        description: "Welcome to Articasso where you can view millions of artworks made by over 16000 artists.",
    },
    "": {
        template: "/routes/index.html",
        title: "Articasso",
        description: "Welcome to Articasso where you can view millions of artworks made by over 16000 artists.",
    },
    'about': {
        template: "/routes/about.html",
        title: "Articasso: About",
        description: "This is the about page.",
    },
    'art': {
        template: "/routes/art.html",
        title: "Articasso: View Art",
        description: "This is the art page.",
    },
    'feed': {
        template: "/routes/feed.html",
        title: "Articasso: Latest Artworks",
        description: "Enjoy These latest additions to the Artic Database.",
    },
    'odyssey': {
        template: "/routes/odyssey.html",
        title: "Articasso: Art Odyssey",
        description: "Art Odyssey is a huge collection of the very top historic artworks everyone should experience at least once.",
    },
    'art_search': {
        template: "/routes/art_search.html",
        title: "Articasso: Search Art",
        description: "This is the search page for any artwork you can think of.",
    },
    'artist': {
        template: "/routes/artist.html",
        title: "Articasso: View Artist",
        description: "This is the artist lookup page.",
    },
    'artist_search': {
        template: "/routes/artist_search.html",
        title: "Articasso: Search Artists",
        description: "This is the search page for any artist you can think of.",
    },
    'category': {
        template: "/routes/category.html",
        title: "Articasso: Art Category",
        description: "This is the category page.",
    },
    'category_search': {
        template: "/routes/category_search.html",
        title: "Articasso: Search Categories",
        description: "This is the page to search all categories.",
    }
};

// route function to prevent default url loading and let locationHandler kick in
const route = (event) => {
    event = event || window.event; // get window.event if event argument not provided
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
    locationHandler();
};

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
    if (e.explicitOriginalTarget.className.includes("SPA-link") ){
        e.preventDefault();
        route();
    }
    else {
        if (e.explicitOriginalTarget.className.includes("nav-group") ){
            e.preventDefault();
        }
    }

    
});


export async function locationHandler() {

    const location = window.location.pathname; // get the url path
    let stateManager = new State();
    
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
    // console.log('currentview:',currentView);
    // get the route object from the routes object
    const route = routes[currentView[0]] || routes["404"];
    // get the html from the template
    const html = await fetch(route.template).then((response) => response.text());
    // console.log('html loaded:', html)
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

    let lastVisited = undefined ;
  
    switch (currentView[0]) {
        case '':
            displayArtworkofDay();
            displayRecentFeed();
            displayCuratedlist();
            break;

        case 'art': {
            // DOM Elements
            const artworksSection = document.getElementById('artworks');
            const searchBar = document.getElementById('search-bar');
            const searchButton = document.getElementById('search-button');
            const artInfo = document.getElementById('art-info');
            
            
            if (currentView[1]) { // user has clicked an SPA-link link, show the proper artwork
                artInfo.innerHTML = '';
                artworksSection.innerHTML = '';
                stateManager.addRoute('art', currentView[1]);
                searchBar.defaultValue = currentView[1];
                try {
                    await displayArtworkPage(currentView[1]); // Display artwork card
                    artworksSection.scrollIntoView();
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${currentView[1]}`);
                    artworksSection.appendChild(errorMessage);
                }
            } else { 
                lastVisited = stateManager.getLastVisitedField("art");
                if (lastVisited) { // user hasn't clicked any artwork but has previously seen an artwork
                    // artInfo.innerHTML = `<div>Since You previously looked up: ${lastVisited}<br></div>`;
                    artworksSection.innerHTML = ``;
                    searchBar.defaultValue = lastVisited;
                    try {
                        await displayArtworkPage(searchBar.defaultValue); // Display artwork card
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${lastVisited}`);
                        artworksSection.appendChild(errorMessage);
                        
                    }}
                    else { // This is the first time user is clicking the artwork page
                        artworksSection.innerHTML = '';
                        artInfo.innerHTML = ``;
                        const information = document.createElement('div');
                        information.className = 'display-information';
                        information.innerHTML = `This is a useful page for those who might know an internal ID for an Artwork.<br>
Otherwise you can search for any artwork by clicking Search Artwork in the Navigation Menu.<br> You can also click on an artwork in the Home page to view the details here.`;
                        artInfo.appendChild(information);
            }}
            

            searchButton.addEventListener('click', async () => {
                // Clear any existing content
                artworksSection.innerHTML = '';
                artInfo.innerHTML = ``;
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
                    stateManager.addRoute('art', id);
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
        }
        case 'artist': {

            // DOM Elements
            const artistGrid = document.getElementById('artist-grid');
            const artistSearch = document.getElementById('search-bar');
            const ArtistSearchButton = document.getElementById('search-button');
            const artistInfo = document.getElementById('artist-info');  
            
            if (currentView[1]) { // user has clicked an SPA-link link and needs to be shown the artist
                artistInfo.innerHTML = ``;
                artistGrid.innerHTML = '';
                stateManager.addRoute('artist', currentView[1]);
                artistSearch.defaultValue = currentView[1];
                try {
                    await displayArtist(currentView[1]); // Display artist card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid Artist ID. The Artic Database has no artist with id: ${currentView[1]}`);
                    artistInfo.appendChild(errorMessage);
                }
            } else {
                lastVisited = stateManager.getLastVisitedField("artist");
                if (lastVisited) { // user hasn't requested an artist but has previously seen one
                    // artistInfo.innerHTML = `<div>Since You previously looked up: ${lastVisited}<br></div>`;
                    artistGrid.innerHTML = ``;
                    artistSearch.defaultValue = lastVisited;
                    try {
                        await displayArtist(artistSearch.defaultValue); // Display artist card previously shown
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${lastVisited}`);
                        artistInfo.appendChild(errorMessage);
                    }}
                    else {  // user hasn't been to this page before. show the welcome information.
                        artistInfo.innerHTML = '';
                        artistGrid.innerHTML = ``;
                        const information = document.createElement('div');
                        information.className = 'display-information';
                        information.innerHTML = `This is a useful page for those who might know an internal ID for an Artist.<br>
Otherwise you can search for any Artist by clicking Search Artist in the Navigation Menu. <br> You can also click on an artist link in the description of a any artwork you like. `;
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
                    stateManager.addRoute('artist', id);

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
                    ArtistSearchButton.click();
                }}); 
                
                break;
            }
        case 'about':
                break;

        case 'category': {

            // DOM Elements
            const categoryGrid = document.getElementById('category-grid');
            const categoryInfo = document.getElementById('category-info');
            const categorySearch = document.getElementById('search-bar');
            const categorySearchButton = document.getElementById('search-button');
            
            if (currentView[1]) { // try to show category id if user clicked on a link
                categoryInfo.innerHTML = '';
                categoryGrid.innerHTML = '';
                categorySearch.defaultValue = currentView[1];
                stateManager.addRoute('category', currentView[1]);
                try {
                    await displayCategory(currentView[1]); // Display category card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid Category ID. The Artic Database has no category with id: ${currentView[1]}`);
                    categoryInfo.appendChild(errorMessage);
                }
            } else { // If user has visited any valid category before switching to other tabs show it instead 
                lastVisited = stateManager.getLastVisitedField("category");
                if (lastVisited) {
                    // categoryInfo.innerHTML = `<div>Since You previously looked up: ${lastVisited}<br></div>`;
                    categorySearch.defaultValue = lastVisited;
                    try {
                        await displayCategory(categorySearch.defaultValue); // Display category card shown before
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no category with id: ${lastVisited}`);
                        categoryInfo.appendChild(errorMessage);
                    }}
                else { // user hasn't visited categories tabs before, show placeholder.
                    categoryInfo.innerHTML = '';
                    categoryGrid.innerHTML = ``;
                    const information = document.createElement('div');
                    information.className = 'display-information';
                    information.innerHTML = 'This is a useful page for those who might know an internal ID for a category.<br>Otherwise you can search for any category by clicking Search Category in the Navigation Menu.<br>Did you know if you click on the category field of any artwork you can view the similar artworks within that category? ';
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
                    stateManager.addRoute('category', id);

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
            }
            case 'art_search': {
            // DOM Elements
            const artworksSection = document.getElementById('artworks');
            const searchBar = document.getElementById('search-bar');
            const searchButton = document.getElementById('search-button');
            const artInfo = document.getElementById('art-info');
            
            lastVisited = stateManager.getLastVisitedField("art_search");
            if (lastVisited) { // user has previously searched for something
                    // artInfo.innerHTML = `<div>Since You previously searched for: ${lastVisited}<br></div>`;
                    artworksSection.innerHTML = '';
                    searchBar.defaultValue = lastVisited;
                    try {
                        await displayArtworkSearch(lastVisited); // Display artwork card
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${lastVisited}`);
                        artworksSection.appendChild(errorMessage);
                        
                    }}
            else { // This is the first time user is clicking the artwork page
                searchBar.placeholder = "Search Art by Origin, Style or Artist";
                artworksSection.innerHTML = '';
                artInfo.innerHTML = '';
                const information = document.createElement('div');
                information.className = 'display-information';
                information.innerHTML = 'Search for art in field above to view the artwork information.';
                artInfo.appendChild(information);
            }
            
            
            
            

            searchButton.addEventListener('click', async () => {
                // Clear any existing content
                artworksSection.innerHTML = '';
                artInfo.innerHTML = '';
            
                const searchValue = searchBar.value.trim();
                if (searchValue === '') {
                const errorMessage = createErrorMessage('Please enter something to search.');
                artworksSection.appendChild(errorMessage);
                return;
                }
                
                try {

                    stateManager.addRoute('art_search', searchValue);
                    window.history.replaceState = `/art_search/${searchValue}`
                    await displayArtworkSearch(searchValue); // Display search value
                    
                } catch (error) {
                    const errorMessage = createErrorMessage(`There is a problem with your search term.`);
                    artworksSection.appendChild(errorMessage);
                    return 
                }
                }
            );
            
                        
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
            }
            case 'artist_search': {
                // DOM Elements

            const artistGrid = document.getElementById('artist-grid');
            const artistSearch = document.getElementById('search-bar');
            const ArtistSearchButton = document.getElementById('search-button');
            const artistInfo = document.getElementById('artist-info');  
            
            lastVisited = stateManager.getLastVisitedField("artist_search");
            if (lastVisited) { // user hasn't requested an artist but has previously seen one
                    // artistInfo.innerHTML = `<div>Since You previously searched for: ${lastVisited}<br></div>`;
                    artistSearch.defaultValue = lastVisited;
                    try {
                        await displayArtistSearch(artistSearch.defaultValue); // Display artists
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${lastVisited}`);
                        artistInfo.appendChild(errorMessage);
                    }}
            else {  // user hasn't been to this page before. show the welcome information.
                        artistInfo.innerHTML = '';
                        artistGrid.innerHTML = '';
                        const information = document.createElement('div');
                        information.className = 'display-information';
                        information.innerHTML = 'Enter your search term in the field above to view the artist information. ';
                        artistInfo.appendChild(information);
                    }


            
                    
            ArtistSearchButton.addEventListener('click', async () => {
                // Clear any existing content
                artistGrid.innerHTML = '';
                artistInfo.innerHTML = '';

            
                const searchValue = artistSearch.value.trim();
                if (searchValue === '') {
                    const errorMessage = createErrorMessage('Please enter something to search.');
                    artistInfo.appendChild(errorMessage);
                    return;
                }
                         
                try {
                    window.history.replaceState = `/artist_search/${searchValue}`;
                    stateManager.addRoute('artist_search', searchValue);
                    await displayArtistSearch(searchValue); // Display artwork card

                } catch (error) {
                    const errorMessage = createErrorMessage(`There is a problem with your search term.`);
                    artistInfo.appendChild(errorMessage);
                }
                
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
                    ArtistSearchButton.click();
                }}); 

                break
            }

            case 'odyssey': {
                displayOdysseyPage();
                break
            }
            case 'feed': {
                displayFeedPage();
                break
            }
            case 'category_search': {
                // console.log('Category Search Loaded');
                // DOM Elements
                const categoryGrid = document.getElementById('category-grid');
                const categoryInfo = document.getElementById('category-info');
                const categorySearch = document.getElementById('search-bar');
                const categorySearchButton = document.getElementById('search-button');
                
                lastVisited = stateManager.getLastVisitedField("category_search");
                if (lastVisited) {// If user has visited any valid category before switching to other tabs show it instead 
                    // categoryInfo.innerHTML = `<div>Since You previously searched for: ${lastVisited}<br></div>`;
                    categorySearch.defaultValue = lastVisited;
                    try {
                        await displayCategorySearch(categorySearch.defaultValue); // Display categories
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no category with id: ${lastVisited}`);
                        categoryInfo.appendChild(errorMessage);
                    }}
                else { // user hasn't visited categories tabs before, show placeholder.
                    categoryInfo.innerHTML = '';
                const information = document.createElement('div');
                information.className = 'display-information';
                information.innerHTML = 'Enter your search term in the field above to view the category information. ';
                categoryInfo.appendChild(information);
            }                             
    
                categorySearchButton.addEventListener('click', async () => {
                    // Clear any existing content
                    categoryGrid.innerHTML = '';
                    categoryInfo.innerHTML = '';
    
    
                    const searchValue = categorySearch.value.trim();
                    if (searchValue === '') {
                    const errorMessage = createErrorMessage('Please enter something to search.');
                    categoryInfo.appendChild(errorMessage);
                    return;
                    }
                
                    // Display either an artwork card or a post based on the entered ID
                    
                    try {
                        stateManager.addRoute('category_search', searchValue);
                        window.history.replaceState = `/category_search/${searchValue}`
                        await displayCategorySearch(searchValue); // Display artwork card
    
    
                    } catch (error) {
                        const errorMessage = createErrorMessage(`Something went wrong when searching.`);
                        categoryInfo.appendChild(errorMessage);
    
                    }
                                      
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
    
                break;}
        default:
                window.location.pathname = '/';
                console.log('404 Encountered')
                break;
    }
};

document.addEventListener("touchstart", function() {}, true);

// Initialize the State management

// call the urlLocationHandler to load the page
locationHandler();
window.onpopstate = locationHandler;
window.route = route;



