import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import { processArtistSearch } from './artistSearch.js';

export async function routeArtistSearch() {
    // DOM Elements

    const artistGrid = document.getElementById('artist-grid');
    const artistSearch = document.getElementById('search-bar');
    const ArtistSearchButton = document.getElementById('search-button');
    const artistInfo = document.getElementById('artist-info');

    // State
    let stateManager = new state.State();
    let lastVisited = stateManager.getLastVisitedField("artist_search");
    if (lastVisited) { // user hasn't requested an artist but has previously seen one
        // artistInfo.innerHTML = `<div>Since You previously searched for: ${lastVisited}<br></div>`;
        artistSearch.defaultValue = lastVisited;
        try {
            await processArtistSearch(artistSearch.defaultValue); // Display artists
        } catch (error) {
            const errorMessage = components.errorMessage(`Invalid ID. The Artic Database has no art with id: ${lastVisited}`);
            artistInfo.appendChild(errorMessage);
        }
    }
    else {  // user hasn't been to this page before. show the welcome information.
        artistInfo.innerHTML = '';
        artistGrid.innerHTML = '';
        const information = document.createElement('div');
        information.className = 'display-information';
        information.innerHTML = `<div class='big-header'><h2>Enter your search term in the field above to view the artist information.</h2></div> `;
        artistInfo.appendChild(information);
    }


    ArtistSearchButton.addEventListener('click', async () => {
        // Clear any existing content
        artistGrid.innerHTML = '';
        artistInfo.innerHTML = '';


        const searchValue = artistSearch.value.trim();
        if (searchValue === '') {
            const errorMessage = components.errorMessage('Please enter something to search.');
            artistInfo.appendChild(errorMessage);
            return;
        }

        try {
            window.history.replaceState = `/artist_search/${searchValue}`;
            stateManager.addRoute('artist_search', searchValue);
            await processArtistSearch(searchValue); // Display artwork card

        } catch (error) {
            const errorMessage = components.errorMessage(`There is a problem with your search term.`);
            artistInfo.appendChild(errorMessage);
        }

    }
    );


    artistSearch.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            event.preventDefault();
            ArtistSearchButton.click();
        }
    });
}