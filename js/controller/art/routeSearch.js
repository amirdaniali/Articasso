import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import { processArtSearch } from './artSearch.js';

export async function routeArtSearch(){
    // DOM Elements
    const artworksSection = document.getElementById('artworks');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const artInfo = document.getElementById('art-info');

    // State
    const stateManager = new state.sessionState()    
    let lastVisited = stateManager.getLastVisitedField("art_search");

    if (lastVisited) { // user has previously searched for something
            // artInfo.innerHTML = `<div>Since You previously searched for: ${lastVisited}<br></div>`;
            artworksSection.innerHTML = '';
            searchBar.defaultValue = lastVisited;
            try {
                await processArtSearch(lastVisited); // Display artwork card
            } catch (error) {
                const errorMessage = components.errorMessage(`Invalid ID. The Artic Database has no art with id: ${lastVisited}`);
                artworksSection.appendChild(errorMessage);
                
            }}
    else { // This is the first time user is clicking the artwork page
        searchBar.placeholder = "Search Art by Origin, Style or Artist";
        artworksSection.innerHTML = '';
        artInfo.innerHTML = '';
        const information = document.createElement('div');
        information.className = 'display-information';
        information.innerHTML = `<div class='big-header'>Search for art in field above to view the artwork information.</div>`;
        artInfo.appendChild(information);
    }
    
    

    searchButton.addEventListener('click', async () => {
        // Clear any existing content
        artworksSection.innerHTML = '';
        artInfo.innerHTML = '';
    
        const searchValue = searchBar.value.trim();
        if (searchValue === '') {
        const errorMessage = components.errorMessage('Please enter something to search.');
        artworksSection.appendChild(errorMessage);
        return;
        }
        
        try {

            stateManager.addRoute('art_search', searchValue);
            window.history.replaceState = `/art_search/${searchValue}`
            await processArtSearch(searchValue); // Display search value
            
        } catch (error) {
            const errorMessage = displayErrorMessage(`There is a problem with your search term.`);
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
            // console.log('Pressed Button with Enter');
            searchButton.click();
        }}); 
}