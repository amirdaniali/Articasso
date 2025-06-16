import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import { processCategoryPage } from './category.js';

export async function routeCategory(url_id = null) {
    // DOM Elements
    const categoryGrid = document.getElementById('category-grid');
    const categoryInfo = document.getElementById('category-info');
    const categorySearch = document.getElementById('search-bar');
    const categorySearchButton = document.getElementById('search-button');

    // State
    let stateManager = new state.sessionState();

    if (url_id) { // try to show category id if user clicked on a link
        categoryInfo.innerHTML = '';
        categoryGrid.innerHTML = '';
        categorySearch.defaultValue = url_id;
        stateManager.addRoute('category', url_id);
        try {
            await processCategoryPage(url_id); // Display category page
        } catch (error) {
            console.log(error);
            const errorMessage = components.errorMessage(`Invalid Category ID. The Artic Database has no category with id: ${url_id}`);
            categoryInfo.appendChild(errorMessage);
        }
    } else { // If user has visited any valid category before switching to other tabs show it instead 
        let lastVisited = stateManager.getLastVisitedField("category");
        if (lastVisited) {
            // categoryInfo.innerHTML = `<div>Since You previously looked up: ${lastVisited}<br></div>`;
            categorySearch.defaultValue = lastVisited;
            try {
                await processCategoryPage(lastVisited); // Display category card shown before
            } catch (error) {
                const errorMessage = components.errorMessage(`Invalid ID. The Artic Database has no category with id: ${lastVisited}`);
                categoryInfo.appendChild(errorMessage);
            }
        }
        else { // user hasn't visited categories tabs before, show placeholder.
            categoryInfo.innerHTML = '';
            categoryGrid.innerHTML = ``;
            const information = document.createElement('div');
            information.className = 'display-information';
            information.innerHTML = 'This is a useful page for those who might know an internal ID for a category.<br>Otherwise you can search for any category by clicking Search Category in the Navigation Menu.<br>Did you know if you click on the category field of any artwork you can view the similar artworks within that category? ';
            categoryInfo.appendChild(information);
        }
    }


    categorySearchButton.addEventListener('click', async () => {
        // Clear any existing content
        categoryGrid.innerHTML = '';
        categoryInfo.innerHTML = '';


        const searchValue = categorySearch.value.trim();
        if (searchValue === '') {
            const errorMessage = components.errorMessage('Please enter an ID to search.');
            categoryInfo.appendChild(errorMessage);
            return;
        }

        // Display either an artwork card or a post based on the entered ID
        const id = searchValue;

        try {
            await processCategoryPage(id); // Display artwork card
            stateManager.addRoute('category', id);

        } catch (error) {
            const errorMessage = components.errorMessage(`Invalid category ID. The Artic Database has no artist with id: ${id}`);
            categoryInfo.appendChild(errorMessage);

        }

        window.history.replaceState = `/category/${id}`;

    }
    );

    categorySearch.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            event.preventDefault();
            categorySearchButton.click();
        }
    });
}