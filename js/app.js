import {
  feedCard,
  odysseyCard,
  createLoader,
  loadMoreFeed,
  displayArtwork,
  loadMoreOdyssey,
  createNewArtwork,
  createArtistInfo,
  createArtworkCard,
  displayDayArtwork,
  createErrorMessage,
  createCategoryInfo,
  createArtistResult,
  createCategoryResult,
} from './components.js';

import { 
  find_art,
  find_artist,
  search_arts,
  find_category,
  find_manifest,
  find_art_field,
  find_art_image,
  search_artists,
  find_artist_arts,
  search_categories,
  find_category_arts,
  find_recent_artworks,
} from './helpers.js';

import { State} from './state.js';


// Feed is one of the first sections the user sees in the homepage. 
// Don't mistake this for displayFeedPage; that one loads the feed page
// This function just loads the homepage part
export async function displayRecentFeed(limit=24) {
  const newArtsSection = document.getElementById('new-arts');
  
  try {
    const newArtworks = await find_recent_artworks(limit);
    let state = new State();

    for (let index = 0; index < limit; index++) {
      const element = newArtworks.data[index];
      const loader = createLoader();
      newArtsSection.appendChild(loader);

      let artwork;
      let art_manifest;
      let olddata;
      let art_image;

      let artExists = await state.hasItem("artworksStore", String(element.id));

      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await state.getState("artworksStore", String(element.id));
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        if (element.image_id) {
          art_image = await find_art_image(element.image_id);
          art_manifest = await find_manifest(element.id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        let newData = {
          'art' : element,
          'manifest': art_manifest,
          'image': art_image
        };
        newData.art.data = element;
        state.addItem("artworksStore", String(element.id), newData);
      } 


      
      const [card, status] = createNewArtwork({
        title: element.title,
        artists: element.artist_titles,
        arists_links: element.artist_ids,
        image: art_image,
        id: element.id,
        date: element.date_display,
        short_description: element.short_description,
        description: element.description,
        history: element.exhibition_history,
        color: element.color,
        categories: element.category_titles,
        category_links: element.category_ids,
      }, art_manifest
    );
    
    newArtsSection.removeChild(loader);
      
      if (status.Ok == true) { 
        // If the new artwork doesnt have an image don't show it. 
        // I chose this behavior because most of the latest fetched arts don't have an image attached and they will be attached later on. 
        // but if I show all of them the users will think its an error of the website and not a characteristic of the API
        newArtsSection.appendChild(card);
      }
      
    }
      const feedHandler = feedCard();
      newArtsSection.appendChild(feedHandler);

  }
          
    catch (error) {
      // Remove the loader
      console.log('Error:', error);
      const errorMessage = createErrorMessage(`Problem Fetching New Arts.`);
      newArtsSection.appendChild(errorMessage);
    }
  
}


export async function displayArtist (id) {

  try {
    // if one day i add the arts made by an artist they will be added to the artist grid
    const artistGrid = document.getElementById('artist-grid');    
    const artistInfo = document.getElementById('artist-info');    

    // Create a loader while fetching data
    const loader = createLoader();
    artistInfo.appendChild(loader);
    const artist = await find_artist(id);

    artistInfo.removeChild(loader);


    const card = createArtistInfo(artist);
    artistInfo.appendChild(card);


    const artist_artworks = await find_artist_arts(artist.data.title);

    document.title = artist.data.title || 'View Artist';

    if (artist_artworks.data.length) {
      const artist_arts_header = document.createElement('h2');
      artist_arts_header.className = 'artist-arts-header';
      artist_arts_header.textContent =`Here are the arts created by this artist:`;
      artistInfo.appendChild(artist_arts_header);
    }

    let state = new State();
      
    for (let index = 0; index < artist_artworks.data.length; index++) {
      
      artistGrid.appendChild(loader);
      
      let artwork = artist_artworks.data[index];
      let art_id = artwork.id;
      let art_manifest;
      let olddata;
      let art_image;
      let art_data;
        
      let artExists = await state.hasItem("artworksStore", String(art_id));
      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await state.getState("artworksStore", String(art_id));
        art_data = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        art_data = await find_art(art_id);
        
        if (art_data.data.image_id) {
          art_image = await find_art_image(art_data.data.image_id);
          art_manifest = await find_manifest(art_id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        state.addItem("artworksStore", String(artwork.id), 
          { 'art' : art_data, 
          'manifest': art_manifest,
          'image': art_image})
      } 


      let [card, status] = createNewArtwork({
        title: art_data.data.title,
        artists: art_data.data.artist_titles,
        arists_links: art_data.data.artist_ids,
        image: art_image,
        id: art_data.data.id,
        date: art_data.data.date_display,
        short_description: art_data.data.short_description,
        description: art_data.data.description,
        history: art_data.data.exhibition_history,
        color: art_data.data.color,
        categories: art_data.data.category_titles,
        category_links: art_data.data.category_ids,
        }, art_manifest
      );

      artistGrid.removeChild(loader);
      
      if (status.Ok == true) { 
        artistGrid.appendChild(card);
      }
        
      }
  }
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
    let loader = createLoader();
    categoryInfo.appendChild(loader);
    const category = await find_category(id);
          
    categoryInfo.removeChild(loader);


    const card = createCategoryInfo(category);
    categoryInfo.appendChild(card);

    const category_artworks = await find_category_arts(category.data.title);

    document.title = category.data.title || 'View Category';

    if (category_artworks.data.length) {
      const category_arts_header = document.createElement('h2');
      category_arts_header.className = 'category-arts-header';
      category_arts_header.textContent =`Here are the arts with this category:`;
      categoryInfo.appendChild(category_arts_header);
    }
      
    let state = new State();

    for (let index = 0; index < category_artworks.data.length; index++) {
      
      categoryGrid.appendChild(loader);
      
      let artwork = category_artworks.data[index];
      let art_id = artwork.id;
      let art_manifest;
      let olddata;
      let art_image;
      let art_data;
      
      let artExists = await state.hasItem("artworksStore", String(art_id));
      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await state.getState("artworksStore", String(art_id));
        art_data = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        art_data = await find_art(art_id);
        
        if (art_data.data.image_id) {
          art_image = await find_art_image(art_data.data.image_id);
          art_manifest = await find_manifest(art_id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        let newData = {
          'art' : art_data,
          'manifest': art_manifest,
          'image': art_image
        };
        state.addItem("artworksStore", String(artwork.id), newData);
      }

        let [card, status] = createNewArtwork({
          title: art_data.data.title,
          artists: art_data.data.artist_titles,
          arists_links: art_data.data.artist_ids,
          image: art_image,
          id: art_data.data.id,
          date: art_data.data.date_display,
          short_description: art_data.data.short_description,
          description: art_data.data.description,
          history: art_data.data.exhibition_history,
          color: art_data.data.color,
          categories: art_data.data.category_titles,
          category_links: art_data.data.category_ids,
        }, art_manifest
      );

      categoryGrid.removeChild(loader);
      
      if (status.Ok == true) { 
        categoryGrid.appendChild(card);
      }}}

  catch (error) {
    console.log('Error:', error);
    const errorMessage = createErrorMessage(`Invalid Category ID. The Artic database has no category with id: ${id}`);
    categoryInfo.appendChild(errorMessage);
}}
    



export async function displayCuratedlist() {
  const curatedArtsSection = document.getElementById('curated-arts');

  // I went through a lot of art in my free time and these are my favourites. 
  const curated_ids = [
    49686, 
    15563,
    11723,
    86385,
    27992,
    14572,
    129884,
    5580,
    31816,
    187528, 
    55494,
    64729,
    151108,
    16488,
    14598,
    4884,
    45418,
    80084,
    61428,
    28067,
  ];
  let loader = createLoader();
  let state = new State();


  // Display an artwork for each id
  try {
    for (let index = 0; index < curated_ids.length; index++) {
      curatedArtsSection.appendChild(loader);



      let art_id = curated_ids[index];
      let artwork;
      let art_manifest;
      let olddata;
      let art_image;

      let artExists = await state.hasItem("artworksStore", String(art_id));
      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await state.getState("artworksStore", String(art_id));
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        artwork =  await find_art(art_id,false);
        
        if (artwork.data.image_id) {
          art_image = await find_art_image(artwork.data.image_id);
          art_manifest= await find_manifest(art_id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        let newData = {
          'art' : artwork,
          'manifest': art_manifest,
          'image': art_image
        };
        state.addItem("artworksStore", String(art_id), newData);
      } 

      const card = createArtworkCard({
        title: artwork.data.title,
        artists: artwork.data.artist_titles,
        arists_links: artwork.data.artist_ids,
        image: art_image,
        id: artwork.data.id,
        date: artwork.data.date_display,
        description: artwork.data.short_description,
        history: artwork.data.exhibition_history,
        color: artwork.data.color,
        categories: artwork.data.category_titles,
        category_links: artwork.data.category_ids,
      }, art_manifest);

      curatedArtsSection.removeChild(loader);
      curatedArtsSection.appendChild(card);
    }

    const odysseyHandler = odysseyCard();
    curatedArtsSection.appendChild(odysseyHandler);

  }
          
    catch (error) {
      console.log('Error:', error);
    }
  
}




// Function to display artwork cards
export async function displayArtworkPage(id) {
  try {
    const artworksSection = document.getElementById('artworks');
    const artInfo = document.getElementById('art-info');
    // Create a loader while fetching data
    const loader = createLoader();
    artworksSection.appendChild(loader);
    try {
      let state = new State();
      let artwork;
      let art_manifest;
      let olddata;
      let art_image;

      let artExists = await state.hasItem("artworksStore", String(id));
      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await state.getState("artworksStore", String(id));
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        artwork = await find_art(id, false);
        art_manifest = await find_manifest(id);
        if (artwork.data.image_id) {
          art_image = await find_art_image(artwork.data.image_id)
        } else {
          art_image = null;
        }
        let newData = {
          'art' : artwork,
          'manifest': art_manifest,
          'image': art_image
        };
        state.addItem("artworksStore", String(id), newData);
      } 

    // Remove the loader
    document.title = artwork.data.title || 'View Art';
    artworksSection.removeChild(loader);

        // Create an artwork card and add it to the DOM
    const card = displayArtwork({
      title: artwork.data.title,
      artists: artwork.data.artist_titles,
      arists_links: artwork.data.artist_ids,
      image: art_image,
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
      console.log('Error:', error);
      const errorMessage = createErrorMessage(`Cannot find the id in the Artic Database.`);
      artworksSection.appendChild(errorMessage);
    }

    
  } catch ( error) {
    // Handle errors and show a message
    
    console.error(error);
    const errorMessage = createErrorMessage('Failed to load artwork. Please try again.');
    artworksSection.appendChild(errorMessage);
  }
}



// This is the function I wrote to come up with 370 functioning art IDs so I can have one 'art-of-the-day' for each day in the year. 
export async function test_ids() {
  console.log('Test Ids Initiated.');
  const initial_id = 14591;
  const status = {};
  status.Ok = [];
  status.Bad = [];
  let index = 0;
  while (status.Ok.length < 370) {
    let new_id = initial_id + index;
    try {
      const response = await find_art(new_id);
      if (! response) {
        status.Bad.push(new_id);
        
      }
      else {
        status.Ok.push(new_id);
      }
    } catch (error) {
      status.Bad.push(new_id);
    }
    index++
  }
  for (index = 0; index < status.Ok.length; index++) {
    const element = status.Ok[index];
    console.log(element);
    
  }
  console.log(status.Ok.length,'Ids are good', status.Ok);
  ;
}



// Function to display artwork of day cards 
export async function displayArtworkofDay() {
  try {
    const artSection = document.getElementById('art-of-the-day');
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    let state = new State();
    const id = state.getDayArtWorkID(day);
    // Create a loader while fetching data
    const loader = createLoader();
    artSection.appendChild(loader);


    try {

      let artwork;
      let art_manifest;
      let olddata;
      let art_image;

      let artExists = await state.hasItem("artworksStore", String(id));
      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await state.getState("artworksStore", String(id));
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        artwork = await find_art(id, false);
        art_manifest = await find_manifest(id);
        if (artwork.data.image_id) {
          art_image = await find_art_image(artwork.data.image_id)
        } else {
          art_image = null;
        }
        let newData = {
          'art' : artwork,
          'manifest': art_manifest,
          'image': art_image
        };
        state.addItem("artworksStore", String(id), newData);
      } 

    
    // Remove the loader
    artSection.removeChild(loader);

    // Create an artwork card and add it to the DOM
    const card = displayDayArtwork({
      title: artwork.data.title,
      artists: artwork.data.artist_titles,
      arists_links: artwork.data.artist_ids,
      image: art_image,
      id:artwork.data.id,
      date:artwork.data.date_display,
      description:artwork.data.short_description,
      history: artwork.data.exhibition_history,
      color: artwork.data.color,
      categories: artwork.data.category_titles,
      category_links: artwork.data.category_ids,
    }, art_manifest);
    artSection.appendChild(card);


    } catch (error) {
      // Remove the loader
      artSection.removeChild(loader);
      console.log('Error:', error);
      const errorMessage = createErrorMessage(`Invalid ID. The Artic Database has no art with id: ${id}`);
      artSection.appendChild(errorMessage);
    }

    
  } catch ( error) {
    // Handle errors and show a message
    
    console.error(error);
    const errorMessage = createErrorMessage('Failed to load artwork. Please try again.');
    artSection.appendChild(errorMessage);
  }
}


// Function to display artwork Search Results
export async function displayArtworkSearch(search_term) {
  try {
    const artworksSection = document.getElementById('artworks');
    let state = new State();
    let loader = createLoader();

    // Capitalize each word
    document.title = ('Search Art: '+search_term.replace(/\b\w/g, (c) => c.toUpperCase())) || 'Search Art';
    const searchresults = await search_arts(search_term);
      
    for (let index = 0; index < searchresults.data.length; index++) {
      artworksSection.appendChild(loader);
        
      let artwork = searchresults.data[index];
      let art_id = artwork.id;
      let art_manifest;
      let olddata;
      let art_image;
      let art_data;


      let artExists = await state.hasItem("artworksStore", String(art_id));
      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await state.getState("artworksStore", String(art_id));
        art_data = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        art_data = await find_art(art_id);
        
        if (art_data.data.image_id) {
          art_image = await find_art_image(art_data.data.image_id);
          art_manifest = await find_manifest(art_id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        state.addItem("artworksStore", String(art_id),{
          'art' : art_data,
          'manifest': art_manifest,
          'image': art_image
        })
      }

      let [card, status] = createNewArtwork({
        title: art_data.data.title,
        artists: art_data.data.artist_titles,
        arists_links: art_data.data.artist_ids,
        image: art_image,
        id: art_data.data.id,
        date: art_data.data.date_display,
        short_description: art_data.data.short_description,
        description: art_data.data.description,
        history: art_data.data.exhibition_history,
        color: art_data.data.color,
        categories: art_data.data.category_titles,
        category_links: art_data.data.category_ids,
      }, art_manifest
      );

      artworksSection.removeChild(loader);
      
      if (status.Ok == true) { 
        artworksSection.appendChild(card);
      }}}
    catch (error) {
    // Handle errors and show a message
    
    console.error(error);
    const errorMessage = createErrorMessage('Failed to search artworks.');
    artworksSection.appendChild(errorMessage);
  }
}


// Function to display artist Search Results
export async function displayArtistSearch(search_term) {
  try {
    const artistsSection = document.getElementById('artist-grid');
    let loader = createLoader();

    // Capitalize each word
    document.title = ('Search Artist: '+search_term.replace(/\b\w/g, (c) => c.toUpperCase())) || 'Search Artist';
    const searchresults = await search_artists(search_term);
      
    for (let index = 0; index < searchresults.data.length; index++) {
      artistsSection.appendChild(loader);
      
      let artist = searchresults.data[index];
      let card = createArtistResult(artist);

      artistsSection.removeChild(loader);
      artistsSection.appendChild(card);
      
      }}
    catch (error) {
    // Handle errors and show a message
    
    console.error(error);
    const errorMessage = createErrorMessage('Failed to search artists.');
    artistsSection.appendChild(errorMessage);
  }
}



// Function to display category Search Results
export async function displayCategorySearch(search_term) {

  let loader = createLoader();
  try {
    const categorySection = document.getElementById('category-grid');

    // Capitalize each word
    document.title = ('Search Category: '+search_term.replace(/\b\w/g, (c) => c.toUpperCase())) || 'Search Category'; 
    const searchresults = await search_categories(search_term);
    
    for (let index = 0; index < searchresults.data.length; index++) {
         
      let category = searchresults.data[index];
      categorySection.appendChild(loader);

      let card = createCategoryResult(category);

      categorySection.removeChild(loader);
      categorySection.appendChild(card);
    
      }}
    catch (error) {
    // Handle errors and show a message
    
    console.error(error);
    const errorMessage = createErrorMessage('Failed to search artists.');
    categorySection.appendChild(errorMessage);
  }
}

// Function to display the feed page and it works by adding buttons that load more data. 
export async function displayFeedPage(pageNumber = 1, itemsPerPage = 25) {
  const newArtsSection = document.getElementById('new-arts');
  let loadMore;
  if (pageNumber > 1){
    loadMore = document.getElementById('load-more-card');
    loadMore.remove();
  }
  
  try {
    const newArtworks = await find_recent_artworks(itemsPerPage, pageNumber);
    let state = new State();

    for (let index = 0; index < itemsPerPage; index++) {
      const element = newArtworks.data[index];
      const loader = createLoader();
      newArtsSection.appendChild(loader);

      let artwork;
      let art_manifest;
      let olddata;
      let art_image;

      let artExists = await state.hasItem("artworksStore", String(element.id));

      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await state.getState("artworksStore", String(element.id));
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data

        if (element.image_id) {
          art_image = await find_art_image(element.image_id);
          art_manifest = await find_manifest(element.id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        let newData = {
          'art' : element,
          'manifest': art_manifest,
          'image': art_image
        };
        newData.art.data = element;
        state.addItem("artworksStore", String(element.id), newData);
      } 


      
      const [card, status] = createNewArtwork({
        title: element.title,
        artists: element.artist_titles,
        arists_links: element.artist_ids,
        image: art_image,
        id: element.id,
        date: element.date_display,
        short_description: element.short_description,
        description: element.description,
        history: element.exhibition_history,
        color: element.color,
        categories: element.category_titles,
        category_links: element.category_ids,
      }, art_manifest
    );
    
    newArtsSection.removeChild(loader);
      
      if (status.Ok == true) { 
        newArtsSection.appendChild(card);
      }
      
    }
    
      loadMore = loadMoreFeed();
      newArtsSection.appendChild(loadMore);
 
  }
          
    catch (error) {
      // Remove the loader
      console.log('Error:', error);
      const errorMessage = createErrorMessage(`Problem Fetching New Arts.`);
      newArtsSection.appendChild(errorMessage);
    }
}

// Logic for loading more feed data via a load more button
export function processMoreFeed() {
    let nextPage = Math.ceil(document.querySelectorAll('.artwork-latest').length / 25) + 1;
    console.log(nextPage);
    displayFeedPage(nextPage, 25); // Load next batch of 25 cards
}

// Function to display category Search Results
export async function displayOdysseyPage(pageNumber=1, itemsPerPage=25) {
  let state = new State();
  const artworksSection = document.getElementById('artworks');
  let loadMore;
  if (pageNumber > 1){
    loadMore = document.getElementById('load-more-card');
    loadMore.remove();
  }
  
  try {
    const odysseyArtworks =  state.getArtOdysseyList(pageNumber,itemsPerPage);


    for (let index = 0; index < itemsPerPage; index++) {
      const id = odysseyArtworks[index]['ID'];
      const loader = createLoader();
      artworksSection.appendChild(loader);

      let artwork;
      let art_manifest;
      let olddata;
      let art_image;


      let artExists = await state.hasItem("artworksStore", id);

      if (artExists) { // We have loaded the artwork before, no need to make a fetch request
        olddata = await state.getState("artworksStore", id);
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        art_image = olddata['image'];
      }
      else { // Fetch artwork data
        artwork = await find_art(id,false);

        if (artwork.data.image_id) {
          art_image = await find_art_image(artwork.data.image_id);
          art_manifest = await find_manifest(id);
        } else {
          art_image = null;
          art_manifest = null;
        }
        let newData = {
          'art' : artwork,
          'manifest': art_manifest,
          'image': art_image
        };
        state.addItem("artworksStore", id, newData);
      } 

      const [card, status] = createNewArtwork({
        title: artwork.data.title,
        image: art_image,
        id: id,
        color: artwork.data.color,
      }, art_manifest
    );
    
    artworksSection.removeChild(loader);
      
      if (status.Ok == true) { 
        artworksSection.appendChild(card);
      }
      
    }
    if (document.querySelectorAll('.artwork-latest').length < 420) {
      loadMore = loadMoreOdyssey();
      artworksSection.appendChild(loadMore);
    }

 
  }
          
    catch (error) {
      // Remove the loader
      console.log('Error:', error);
      const errorMessage = createErrorMessage(`Problem Fetching New Arts.`);
      artworksSection.appendChild(errorMessage);
    }
}

// Logic for loading more feed data via a load more button
export function processMoreOdyssey() {
    let nextPage = Math.ceil(document.querySelectorAll('.artworks-grid').length / 25) + 1;
    console.log(nextPage);
    displayOdysseyPage(nextPage, 25); // Load next batch of 25 cards
}

export function displayErrorMessage(message){
  createErrorMessage(message);
}