import * as components from '../../components/index.js';
import * as state from '../../state/index.js';
import { processCategorySearch } from './categorySearch.js';

export async function routeCategorySearch() {
    // DOM Elements
    const categoryGrid = document.getElementById('category-grid');
    const categoryInfo = document.getElementById('category-info');
    const categorySearch = document.getElementById('search-bar');
    const categorySearchButton = document.getElementById('search-button');

    // State
    let stateManager = new state.State();
    let lastVisited = stateManager.getLastVisitedField("category_search");

    if (lastVisited) {// If user has visited any valid category before switching to other tabs show it instead 
        // categoryInfo.innerHTML = `<div>Since You previously searched for: ${lastVisited}<br></div>`;
        categorySearch.defaultValue = lastVisited;
        try {
            await processCategorySearch(lastVisited); // Display categories
        } catch (error) {
            const errorMessage = components.errorMessage(`Invalid ID. The Artic Database has no category with id: ${lastVisited}`);
            categoryInfo.appendChild(errorMessage);
        }
    }
    else { // user hasn't visited categories tabs before, show placeholder.
        categoryInfo.innerHTML = '';
        const information = document.createElement('div');
        information.className = 'display-information';
        information.innerHTML = `<div class='big-header'>Enter your search term in the field above to view the category information.</div> `;
        categoryInfo.appendChild(information);
    }

    categorySearchButton.addEventListener('click', async () => {
        // Clear any existing content
        categoryGrid.innerHTML = '';
        categoryInfo.innerHTML = '';


        const searchValue = categorySearch.value.trim();
        if (searchValue === '') {
            const errorMessage = components.errorMessage('Please enter something to search.');
            categoryInfo.appendChild(errorMessage);
            return;
        }

        // Display either an artwork card or a post based on the entered ID

        try {
            stateManager.addRoute('category_search', searchValue);
            window.history.replaceState = `/category_search/${searchValue}`
            await processCategorySearch(searchValue); // Display artwork card


        } catch (error) {
            const errorMessage = components.errorMessage(`Something went wrong when searching.`);
            categoryInfo.appendChild(errorMessage);

        }

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