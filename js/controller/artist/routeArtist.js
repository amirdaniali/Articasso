import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import { processArtistPage } from './artist.js';

export async function routeArtist(url_id){
    
    // DOM Elements
    const artistGrid = document.getElementById('artist-grid');
    const artistSearch = document.getElementById('search-bar');
    const ArtistSearchButton = document.getElementById('search-button');
    const artistInfo = document.getElementById('artist-info');  

    // State
    let stateManager = new state.State();
    
    if (url_id) { // user has clicked an SPA-link link and needs to be shown the artist
        artistInfo.innerHTML = ``;
        artistGrid.innerHTML = '';
        stateManager.addRoute('artist', url_id);
        artistSearch.defaultValue = url_id;
        try {
            await processArtistPage(url_id); // Display artist page
        } catch (error) {
            const errorMessage = components.errorMessage(`Invalid Artist ID. The Artic Database has no artist with id: ${url_id}`);
            artistInfo.appendChild(errorMessage);
        }
    } else {
        let lastVisited = stateManager.getLastVisitedField("artist");
        if (lastVisited) { // user hasn't requested an artist but has previously seen one
            // artistInfo.innerHTML = `<div>Since You previously looked up: ${lastVisited}<br></div>`;
            artistGrid.innerHTML = ``;
            artistSearch.defaultValue = lastVisited;
            try {
                await processArtistPage(artistSearch.defaultValue); // Display artist card previously shown
            } catch (error) {
                const errorMessage = components.errorMessage(`Invalid ID. The Artic Database has no art with id: ${lastVisited}`);
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
            const errorMessage = components.errorMessage('Please enter an ID to search.');
            artistInfo.appendChild(errorMessage);
            return;
        }
    
        // Display either an artwork card or a post based on the entered ID
        const id = parseInt(searchValue, 10);                
        try {
            await processArtistPage(id); // Display artwork card
            stateManager.addRoute('artist', id);

        } catch (error) {
            const errorMessage = components.errorMessage(`Invalid Artist ID. The Artic Database has no artist with id: ${id}`);
            artistInfo.appendChild(errorMessage);
        }
        window.history.replaceState = `/artist/${id}`;
        }
    );
    
    
    artistSearch.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            event.preventDefault();
            ArtistSearchButton.click();
    }}); 
}