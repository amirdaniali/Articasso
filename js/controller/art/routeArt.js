import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import { processArtPage } from './art.js';

export async function routeArt(url_id) {
    // DOM Elements
    const artworksSection = document.getElementById('artworks');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const artInfo = document.getElementById('art-info');

    // State
    const stateManager = new state.State()
    let lastVisited;

    if (url_id) { // user has clicked an SPA-link link, show the proper artwork
        artInfo.innerHTML = '';
        artworksSection.innerHTML = '';
        stateManager.addRoute('art', url_id);
        searchBar.defaultValue = url_id;
        try {
            await processArtPage(url_id); // Display artwork card
            artworksSection.scrollIntoView();
        } catch (error) {
            const errorMessage = displayErrorMessage(`Invalid ID. The Artic Database has no art with id: ${url_id}`);
            artworksSection.appendChild(errorMessage);
        }
    } else {
        lastVisited = stateManager.getLastVisitedField("art");
        if (lastVisited) { // user hasn't clicked any artwork but has previously seen an artwork
            // artInfo.innerHTML = `<div>Since You previously looked up: ${lastVisited}<br></div>`;
            artworksSection.innerHTML = ``;
            searchBar.defaultValue = lastVisited;
            try {
                await processArtPage(searchBar.defaultValue); // Display artwork card
            } catch (error) {
                const errorMessage = components.errorMessage(`Invalid ID. The Artic Database has no art with id: ${lastVisited}`);
                artworksSection.appendChild(errorMessage);

            }
        }
        else { // This is the first time user is clicking the artwork page
            artworksSection.innerHTML = '';
            artInfo.innerHTML = ``;
            const information = document.createElement('div');
            information.className = 'display-information';
            information.innerHTML = `This is a useful page for those who might know an internal ID for an Artwork.<br>
Otherwise you can search for any artwork by clicking Search Artwork in the Navigation Menu.<br> You can also click on an artwork in the Home page to view the details here.`;
            artInfo.appendChild(information);
        }
    }


    searchButton.addEventListener('click', async () => {
        // Clear any existing content
        artworksSection.innerHTML = '';
        artInfo.innerHTML = ``;
        const searchValue = searchBar.value.trim();
        if (searchValue === '') {
            const errorMessage = components.errorMessage('Please enter an ID to search.');
            artworksSection.appendChild(errorMessage);
            return;
        }

        // Display either an artwork card or a post based on the entered ID
        const id = parseInt(searchValue, 10);

        if (isNaN(id)) {
            const errorMessage = components.errorMessage('Invalid ID. Please enter a numeric value.');
            artworksSection.appendChild(errorMessage);
        } else {

            try {
                await processArtPage(id); // Display artwork card
                stateManager.addRoute('art', id);
            } catch (error) {
                const errorMessage = components.errorMessage(`Invalid ID. The Artic Database has no art with id: ${id}`);
                artworksSection.appendChild(errorMessage);
                return;
            }

            window.history.replaceState = `/art/${id}`;
        }
    });


    // Execute a function when the user presses a key on the keyboard
    searchBar.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            // console.log('Pressed Button with Enter');
            searchButton.click();
        }
    });
}