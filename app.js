import { createArtworkCard, createPost, createLoader, createErrorMessage } from './components.js';
import { find_art, find_recent_artworks, find_art_field, find_art_image } from './helpers.js';



// Function to display artwork cards
export async function displayArtworkCard(id) {
  try {
    const artworksSection = document.getElementById('artworks');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    // Create a loader while fetching data
    const loader = createLoader();
    artworksSection.appendChild(loader);
    try {
      // Fetch artwork data
    const artwork = await find_art(id, false);
    // console.log(artwork.data.image_id);
    // console.log(`displayartwork retrevied art ${artwork}`)
      if (artwork.data.image_id) {
        var artImage = await find_art_image(artwork.data.image_id)
      } else {
        var artImage = null;
      }
    // console.log(artImage);
    
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
      description:artwork.data.short_description,
      history: artwork.data.exhibition_history,
      color: artwork.data.color,
      categories: artwork.data.category_titles,
      category_links: artwork.data.category_ids,
    });
    artworksSection.appendChild(card);


    } catch (error) {
      // Remove the loader
      artworksSection.removeChild(loader);
      console.log('Error:', error);
      const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${id}`);
      artworksSection.appendChild(errorMessage);
    }

    
  } catch ( error) {
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
        const artworksSection = document.getElementById('artworks');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
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
  finally {
    
  }
}


export async function populatePage(limit=15) {
  const newArtsSection = document.getElementById('new-arts')
  
  try {
    const newArtworks = await find_recent_artworks(15);

    for (let index = 0; index < limit; index++) {
      const element = newArtworks.data[index];
      const loader = createLoader();
      newArtsSection.appendChild(loader);
      if (element.image_id) {
        var artImage = await find_art_image(element.image_id)
      } else {
        var artImage = null;
      }
      newArtsSection.removeChild(loader);
      const card = createArtworkCard({
        title: element.title,
        artists: element.artist_titles,
        arists_links: element.artist_ids,
        image: artImage,
        id: element.id,
        date: element.date_display,
        description: element.short_description,
        history: element.exhibition_history,
        color: element.color,
        categories: element.category_titles,
        category_links: element.category_ids,
      });
      newArtsSection.appendChild(card);
    }}
          
    catch (error) {
      // Remove the loader
      console.log('Error:', error);
      // const errorMessage = createErrorMessage(`Problem Fetching New Arts.`);
      // newArtsSection.appendChild(errorMessage);
    }
  
}