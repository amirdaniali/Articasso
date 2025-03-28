import { createArtworkCard, createPost, createLoader, createErrorMessage } from './components.js';
import { find_art, find_art_field, find_art_image } from './helpers.js';



// DOM Elements
export const artworksSection = document.getElementById('artworks');
export const searchBar = document.getElementById('search-bar');
export const searchButton = document.getElementById('search-button');

// Function to display artwork cards
export async function displayArtworkCard(id) {
  try {
    // Create a loader while fetching data
    const loader = createLoader();
    artworksSection.appendChild(loader);

    // Fetch artwork data
    const artwork = await find_art(id, false);
    // console.log(`displayartwork retrevied art ${artwork}`)
    const artImage = await find_art_image(artwork.data.image_id)
    // console.log(`art image found`,artImage)

    // Remove the loader
    artworksSection.removeChild(loader);

    // Create an artwork card and add it to the DOM
    const card = createArtworkCard({
      title: artwork.data.title,
      artists: artwork.data.artist_titles,
      arists_links: artwork.data.artist_ids,
      image: artImage,
      id:artwork.data.id,
      date:artwork.data.date_display,
      description:artwork.data.description,
      history: artwork.data.exhibition_history,
      color: artwork.data.color,
      categories: artwork.data.category_titles,
      category_links: artwork.data.category_ids,
    });
    artworksSection.appendChild(card);
  } catch (error) {
    // Handle errors and show a message
    console.error(error);
    const errorMessage = createErrorMessage('Failed to load artwork. Please try again.');
    artworksSection.appendChild(errorMessage);
  }
}

// Function to display a post
export async function displayPost(id) {
  try {
    // Create a loader while fetching data
    const loader = createLoader();
    artworksSection.appendChild(loader);

    // Fetch post data
    const post = await find_art(id);
    const artImage = await find_art_image(post.data.image_id)

    // Remove the loader
    artworksSection.removeChild(loader);

    // Create a post component and add it to the DOM
    const postComponent = createPost({
      title: post.data.title,
      content: post.data.description,
      author: post.data.artist_titles
    });
    artworksSection.appendChild(postComponent);
  } catch (error) {
    // Handle errors and show a message
    console.error(error);
    const errorMessage = createErrorMessage('Failed to load post. Please try again.');
    artworksSection.appendChild(errorMessage);
  }
}



// // Initial Content (Optional)
// export async function loadInitialContent() {
//   // Load some artwork cards for demonstration (IDs can be static or randomized)
//   const sampleIds = [121231, 221222, 333113];
//   for (const id of sampleIds) {
//     await displayArtworkCard(id);
//   }
// }

// // Load initial content on page load
// loadInitialContent();




  // Event Listener for Search Button
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
    // Example: Display both artwork cards and posts for demonstration
    await displayArtworkCard(id); // Display artwork card
    window.history.replaceState = `/${id}`;
    // await displayPost(id);       // Display post
  }
});


// searchButton.addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') {
//       // code for enter
//       console.log('Enter pressed')
//     }

// });



// Execute a function when the user presses a key on the keyboard
searchBar.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    console.log('Pressed Button with Enter');
    searchButton.click();
  }
}); 



// function displayHash() {
//   var theHash = window.location.hash;
//   if (theHash.length == 0) { theHash = "_index"; }
//   return true;
// }

// window.addEventListener("hashchange", function() {
//   console.log("hashchange event");
//   displayHash();
// });

// window.addEventListener("DOMContentLoaded", function(ev) {
//   console.log("DOMContentLoaded event");
//   displayHash();
// });