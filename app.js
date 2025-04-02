import { createArtworkCard, createLoader, createErrorMessage, createArtistInfo, createCategoryInfo } from './components.js';
import { find_art, find_recent_artworks, find_manifest, find_art_field, find_art_image, find_artist, find_category } from './helpers.js';

// todo: make populatepage and artworkcard styles separate
//todo: maybe add history functionality like imdb, add separate page for art, find a way to show artist work

// Function to display artwork cards
export async function displayArtworkCard(id) {
  try {
    const artworksSection = document.getElementById('artworks');
    // Create a loader while fetching data
    const loader = createLoader();
    artworksSection.appendChild(loader);
    try {
      // Fetch artwork data
    const artwork = await find_art(id, false);
    const art_manifest = await find_manifest(id);
    console.log('manifest', art_manifest);
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
    }, art_manifest);
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

export async function populatePage(limit=15) {
  const newArtsSection = document.getElementById('new-arts');
  
  try {
    const newArtworks = await find_recent_artworks(15);

    for (let index = 0; index < limit; index++) {
      const element = newArtworks.data[index];
      const loader = createLoader();
      newArtsSection.appendChild(loader);
      if (element.image_id) {
        var artImage = await find_art_image(element.image_id);
        var art_manifest = await find_manifest(element.id);
      } else {
        var artImage = null;
        var art_manifest = null;
      }
      newArtsSection.removeChild(loader);
      const card = createArtworkCard({
        title: element.title,
        artists: element.artist_titles,
        arists_links: element.artist_ids,
        image: artImage,
        id: element.id,
        date: element.date_display,
        short_description: element.short_description,
        description: element.description,
        history: element.exhibition_history,
        color: element.color,
        categories: element.category_titles,
        category_links: element.category_ids,
      }, art_manifest);
      newArtsSection.appendChild(card);
    }}
          
    catch (error) {
      // Remove the loader
      console.log('Error:', error);
      const errorMessage = createErrorMessage(`Problem Fetching New Arts.`);
      newArtsSection.appendChild(errorMessage);
    }
  
}


export async function displayArtist (id) {

  try {
    const artistGrid = document.getElementById('artist-grid');    
    const artistInfo = document.getElementById('artist-info');    

    // Create a loader while fetching data
    const loader = createLoader();
    artistInfo.appendChild(loader);
    const artist = await find_artist(id);
    // console.log('Artist Data: ', artist);


    // for (const artwork in artist.data) {
    //   const card = createArtworkCard({
    //     title: artwork.title,
    //     // artists: [id],
    //     // arists_links: artwork.artist_ids,
    //     // image: '',
    //     id: artwork.id,
    //     date: artwork.date_display,
    //     description: artwork.short_description,
    //     history: artwork.exhibition_history,
    //     color: artwork.color,
    //     categories: artwork.category_titles,
    //     category_links: artwork.category_ids,
    //   });
    //   artistGrid.appendChild(card);
    // }
  
    artistInfo.removeChild(loader);


    const card = createArtistInfo(artist);
    artistInfo.appendChild(card);}

     
    // Remove the loader
    


  catch (error) {
      // Remove the loader
      // artistInfo.removeChild(loader);
      console.log('Error:', error);
      const errorMessage = createErrorMessage(`Invalid Artist ID. The Artic Database has no artist with id: ${id}`);
      artistInfo.appendChild(errorMessage);
}}



export async function displayCategory (id) {

  try {
    const categoryGrid = document.getElementById('category-grid');    
    const categoryInfo = document.getElementById('category-info');    

    // Create a loader while fetching data
    const loader = createLoader();
    categoryInfo.appendChild(loader);
    const category = await find_category(id);
    console.log('Category Data: ', category);
      
    categoryInfo.removeChild(loader);


    const card = createCategoryInfo(category);
    categoryInfo.appendChild(card);}  

  catch (error) {
    // Remove the loader
    // artistGrid.removeChild(loader);
    console.log('Error:', error);
    const errorMessage = createErrorMessage(`Invalid Category ID. The Artic database has no category with id: ${id}`);
    categoryInfo.appendChild(errorMessage);
}}
    



export async function displayCuratedlist() {
  const curatedArtsSection = document.getElementById('curated-arts');
  const curated_ids = [187528, 
    27992,
    86385,
    15563,
    4884,
    14572,
    5580,
    14591,
    129884,
    111442,
    26650,
    11723,
    31816,
    15705,
    55494,
    64729,
    7503,
    151108,
    45418,
    138,
    117266,
    89503,
    47149,
    102611,
    147003,
    90048,
    5357,
    14574,
    18951,
    84076,
    5349,
    16568,
    6565,
    20684,
    22871,
    16156,
    83642,
    111628,
    80084,
    61428,
    28067,
  ];
  try {
    for (let index = 0; index < curated_ids.length; index++) {
      const artwork =  await find_art(curated_ids[index],false);
      const loader = createLoader();
      curatedArtsSection.appendChild(loader);
      if (artwork.data.image_id) {
        var artImage = await find_art_image(artwork.data.image_id);
        var art_manifest= await find_manifest(curated_ids[index]);
      } else {
        var artImage = null;
        var art_manifest = null;
      }
      curatedArtsSection.removeChild(loader);
      const card = createArtworkCard({
        title: artwork.data.title,
        artists: artwork.data.artist_titles,
        arists_links: artwork.data.artist_ids,
        image: artImage,
        id: artwork.data.id,
        date: artwork.data.date_display,
        description: artwork.data.short_description,
        history: artwork.data.exhibition_history,
        color: artwork.data.color,
        categories: artwork.data.category_titles,
        category_links: artwork.data.category_ids,
      }, art_manifest);
      curatedArtsSection.appendChild(card);
    }}
          
    catch (error) {
      console.log('Error:', error);
    }
  
}