import { createErrorMessage } from './components.js';
import {test_ids, displayArtworkPage, populatePage, displayArtist, displayCategory, displayCuratedlist, displayArtworkofDay } from './app.js';


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

    // get the url path, replace hash with empty string
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
            console.log('Home Loaded.')
            populatePage();
            displayArtworkofDay();
            displayCuratedlist();
            break;

        case 'art':
          
            // DOM Elements
            const artworksSection = document.getElementById('artworks');
            const searchBar = document.getElementById('search-bar');
            const searchButton = document.getElementById('search-button');
            
            if (currentView[1]) {
                searchBar.defaultValue = currentView[1];
                try {
                    await displayArtworkPage(currentView[1]); // Display artwork card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${currentView[1]}`);
                    artworksSection.appendChild(errorMessage);
                }
            } else {
                searchBar.placeholder = "Art ID";
            }
            

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
                
                
                console.log('Art Loaded.')
                break;
            
        case 'artist':

                // DOM Elements
            const artistGrid = document.getElementById('artist-grid');
            const artistSearch = document.getElementById('search-bar');
            const ArtistSearchButton = document.getElementById('search-button');
            const artistInfo = document.getElementById('artist-info');  
            
            if (currentView[1]) {
                artistSearch.defaultValue = currentView[1];
                try {
                    await displayArtist(currentView[1]); // Display artist card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid Artist ID. The Artic Database has no artist with id: ${currentView[1]}`);
                    artistInfo.appendChild(errorMessage);
                }
            } else {
                ArtistSearchButton.placeholder = "Artist ID";
            }
            

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
                console.log('artist Id to check= ',id);
                
                try {
                    await displayArtist(id); // Display artwork card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid Artist ID. The Artic Database has no artist with id: ${id}`);
                    artistInfo.appendChild(errorMessage);
                }
                
                
                window.history.replaceState = `/artist/${id}`;
                
                }
            );
            
            
            artistSearch.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    // code for enter
                    console.log('Enter pressed')
                }
            
            });
            
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
                
                

                console.log('Artist Loaded.')
                break;
        case 'about':
                console.log('About Loaded.')
                break;
        case 'category':

            // DOM Elements
            const categoryGrid = document.getElementById('category-grid');
            const categorySearch = document.getElementById('search-bar');
            const categorySearchButton = document.getElementById('search-button');
            
            if (currentView[1]) {
                categorySearch.defaultValue = currentView[1];
                try {
                    await displayCategory(currentView[1]); // Display category card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid Category ID. The Artic Database has no category with id: ${currentView[1]}`);
                    categoryGrid.appendChild(errorMessage);
                }
            } else {
                categorySearchButton.placeholder = "Category ID";
            }
            

            categorySearchButton.addEventListener('click', async () => {
                // Clear any existing content
                categoryGrid.innerHTML = '';
            
                const searchValue = categorySearch.value.trim();
                if (searchValue === '') {
                const errorMessage = createErrorMessage('Please enter an ID to search.');
                categoryGrid.appendChild(errorMessage);
                return;
                }
            
                // Display either an artwork card or a post based on the entered ID
                const id = searchValue;
                console.log('Category ID to check= ',id);
                
                try {
                    await displayCategory(id); // Display artwork card
                } catch (error) {
                    const errorMessage = createErrorMessage(`Invalid category ID. The Artic Database has no artist with id: ${id}`);
                    categoryGrid.appendChild(errorMessage);
                }
                
                window.history.replaceState = `/category/${id}`;
                
                }
            );
            
            
            categorySearch.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    // code for enter
                    console.log('Enter pressed')
                }
            
            });
            
            // Execute a function when the user presses a key on the keyboard
            categorySearch.addEventListener("keypress", function(event) {
                    // If the user presses the "Enter" key on the keyboard
                    if (event.key === "Enter") {
                    // Cancel the default action, if needed
                    event.preventDefault();
                    // Trigger the button element with a click
                    console.log('Pressed Button with Enter');
                    categorySearch.click();
                }}); 



                
                console.log('Category Loaded.')
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