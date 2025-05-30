import { createArtworkCard,
  createLoader,
  createNewArtwork,
  createErrorMessage,
  createArtistInfo,
  displayDayArtwork,
  createCategoryInfo,
  displayArtwork,
  createArtistResult,
  createCategoryResult   } from './components.js';

import { find_art,
  find_recent_artworks,
  search_artists,
  search_categories,
  search_arts,
  find_manifest,
  find_category_arts,
  find_art_field,
  find_art_image,
  find_artist,
  find_category,
  find_artist_arts} from './helpers.js';

import {State,
} from './state.js';



export async function populatePage(limit=25) {
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
      let artImage;

      if (state.hasArtID(String(element.id))) { // We have loaded the artwork before, no need to make a fetch request
        olddata = state.getArtState()[String(element.id)];
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        artImage = olddata['image'];
      }
      else { // Fetch artwork data
        if (element.image_id) {
          artImage = await find_art_image(element.image_id);
          art_manifest = await find_manifest(element.id);
        } else {
          artImage = null;
          art_manifest = null;
        }
        let newData = {
          'art' : element,
          'manifest': art_manifest,
          'image': artImage
        };
        newData.art.data = element;
        state.addArt(String(element.id), newData)
      } 


      
      const [card, status] = createNewArtwork({
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
      }, art_manifest
    );
    
    newArtsSection.removeChild(loader);
      
      if (status.Ok == true) { 
        // If the new artwork doesnt have an image don't show it. 
        // I chose this behavior because most of the latest fetched arts don't have an image attached and they will be attached later on. 
        // but if I show all of them the users will think its an error of the website and not a characteristic of the API
        newArtsSection.appendChild(card);
      }
      
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
      let artImage;
      let art_data;
      
      
      if (state.hasArtID(String(art_id))) { // We have loaded the artwork before, no need to make a fetch request
        olddata = state.getArtState()[String(art_id)];
        art_data = olddata['art'];
        art_manifest = olddata['manifest'];
        artImage = olddata['image'];
      }
      else { // Fetch artwork data
        art_data = await find_art(art_id);
        
        if (art_data.data.image_id) {
          artImage = await find_art_image(art_data.data.image_id);
          art_manifest = await find_manifest(art_id);
        } else {
          artImage = null;
          art_manifest = null;
        }
        state.addArt(String(artwork.id),{
          'art' : art_data,
          'manifest': art_manifest,
          'image': artImage
        })
      } 


      let [card, status] = createNewArtwork({
        title: art_data.data.title,
        artists: art_data.data.artist_titles,
        arists_links: art_data.data.artist_ids,
        image: artImage,
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
      let artImage;
      let art_data;
      
      
      if (state.hasArtID(String(art_id))) { // We have loaded the artwork before, no need to make a fetch request
        olddata = state.getArtState()[String(art_id)];
        art_data = olddata['art'];
        art_manifest = olddata['manifest'];
        artImage = olddata['image'];
      }
      else { // Fetch artwork data
        art_data = await find_art(art_id);
        
        if (art_data.data.image_id) {
          artImage = await find_art_image(art_data.data.image_id);
          art_manifest = await find_manifest(art_id);
        } else {
          artImage = null;
          art_manifest = null;
        }
        state.addArt(String(artwork.id),{
          'art' : art_data,
          'manifest': art_manifest,
          'image': artImage
        })
      }

        let [card, status] = createNewArtwork({
          title: art_data.data.title,
          artists: art_data.data.artist_titles,
          arists_links: art_data.data.artist_ids,
          image: artImage,
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
      let artImage;

      if (state.hasArtID(String(art_id))) { // We have loaded the artwork before, no need to make a fetch request
        olddata = state.getArtState()[String(art_id)];
        artwork = olddata['art'];
        art_manifest = olddata['manifest'];
        artImage = olddata['image'];
      }
      else { // Fetch artwork data
        artwork =  await find_art(art_id,false);
        
        if (artwork.data.image_id) {
          artImage = await find_art_image(artwork.data.image_id);
          art_manifest= await find_manifest(art_id);
        } else {
          artImage = null;
          art_manifest = null;
        }
        state.addArt(String(art_id),{
          'art' : artwork,
          'manifest': art_manifest,
          'image': artImage
        })
      } 

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

      curatedArtsSection.removeChild(loader);
      curatedArtsSection.appendChild(card);
    }}
          
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
      let artImage;

      if (state.hasArtID(String(id))) { // We have loaded the artwork before, no need to make a fetch request
        olddata = state.getArtState()[String(id)];
        artwork = olddata['art'];
        // console.log(olddata);
        art_manifest = olddata['manifest'];
        artImage = olddata['image'];
      }
      else { // Fetch artwork data
        artwork = await find_art(id, false);
        art_manifest = await find_manifest(id);
        if (artwork.data.image_id) {
          artImage = await find_art_image(artwork.data.image_id)
        } else {
          artImage = null;
        }
        state.addArt(String(id),{
          'art' : artwork,
          'manifest': art_manifest,
          'image': artImage
        })
      } 

    // Remove the loader
    document.title = artwork.data.title || 'View Art';
    artworksSection.removeChild(loader);

        // Create an artwork card and add it to the DOM
    const card = displayArtwork({
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
    // These artwork ids were generated by the test_ids() function by setting different initial seeds. 
    const allArtworks = [{"ID":14591},{"ID":14592},{"ID":14593},{"ID":14594},{"ID":14598},{"ID":14601},{"ID":14603},{"ID":14605},{"ID":14619},{"ID":14620},{"ID":14624},{"ID":14626},{"ID":14630},{"ID":14633},{"ID":14634},{"ID":14643},{"ID":14644},{"ID":14647},{"ID":14648},{"ID":14649},{"ID":14650},{"ID":14655},{"ID":14664},{"ID":14665},{"ID":14667},{"ID":14668},{"ID":14669},{"ID":14670},{"ID":14672},{"ID":14674},{"ID":14675},{"ID":14676},{"ID":14677},{"ID":14678},{"ID":14679},{"ID":14681},{"ID":14683},{"ID":14684},{"ID":14686},{"ID":14687},{"ID":14688},{"ID":14689},{"ID":14690},{"ID":14691},{"ID":14692},{"ID":14693},{"ID":14694},{"ID":14695},{"ID":14696},{"ID":14697},{"ID":14698},{"ID":14699},{"ID":14700},{"ID":14701},{"ID":14702},{"ID":14703},{"ID":14704},{"ID":14705},{"ID":14707},{"ID":14708},{"ID":14709},{"ID":14710},{"ID":14711},{"ID":14713},{"ID":14714},{"ID":14715},{"ID":14720},{"ID":14721},{"ID":14727},{"ID":14729},{"ID":14730},{"ID":14731},{"ID":14732},{"ID":14733},{"ID":14734},{"ID":14736},{"ID":14737},{"ID":14739},{"ID":14740},{"ID":14743},{"ID":14745},{"ID":14746},{"ID":14748},{"ID":14749},{"ID":14752},{"ID":14753},{"ID":14755},{"ID":14757},{"ID":14758},{"ID":14761},{"ID":14762},{"ID":14763},{"ID":14764},{"ID":14765},{"ID":14766},{"ID":14767},{"ID":14768},{"ID":14770},{"ID":14771},{"ID":14772},{"ID":14773},{"ID":14774},{"ID":14775},{"ID":14780},{"ID":14781},{"ID":14782},{"ID":14783},{"ID":14786},{"ID":14787},{"ID":14788},{"ID":14789},{"ID":14790},{"ID":14792},{"ID":14794},{"ID":14795},{"ID":14796},{"ID":14797},{"ID":14798},{"ID":14799},{"ID":14803},{"ID":14804},{"ID":14805},{"ID":14806},{"ID":14808},{"ID":14809},{"ID":14810},{"ID":14811},{"ID":14812},{"ID":14813},{"ID":14814},{"ID":14815},{"ID":14816},{"ID":14817},{"ID":14818},{"ID":14819},{"ID":14820},{"ID":14821},{"ID":14822},{"ID":14825},{"ID":14827},{"ID":14831},{"ID":14833},{"ID":14834},{"ID":14835},{"ID":14837},{"ID":14838},{"ID":14839},{"ID":14840},{"ID":14842},{"ID":80062},{"ID":14845},{"ID":14846},{"ID":14847},{"ID":14848},{"ID":14849},{"ID":14850},{"ID":14851},{"ID":14852},{"ID":14853},{"ID":14854},{"ID":14855},{"ID":14856},{"ID":14857},{"ID":14858},{"ID":14859},{"ID":14860},{"ID":14861},{"ID":14862},{"ID":14863},{"ID":14864},{"ID":14865},{"ID":14866},{"ID":14867},{"ID":14869},{"ID":14871},{"ID":14873},{"ID":14874},{"ID":14877},{"ID":14878},{"ID":14880},{"ID":14882},{"ID":14884},{"ID":14889},{"ID":14890},{"ID":14891},{"ID":14892},{"ID":14893},{"ID":14894},{"ID":14895},{"ID":14896},{"ID":14898},{"ID":14900},{"ID":14901},{"ID":14904},{"ID":14906},{"ID":14908},{"ID":14910},{"ID":14912},{"ID":14916},{"ID":14917},{"ID":14919},{"ID":14925},{"ID":14927},{"ID":14929},{"ID":14930},{"ID":14931},{"ID":14932},{"ID":14933},{"ID":14934},{"ID":14935},{"ID":14936},{"ID":14937},{"ID":14938},{"ID":14940},{"ID":14941},{"ID":14943},{"ID":14946},{"ID":14948},{"ID":14959},{"ID":14966},{"ID":14968},{"ID":14970},{"ID":14973},{"ID":14975},{"ID":14977},{"ID":14983},{"ID":14987},{"ID":14992},{"ID":14993},{"ID":14995},{"ID":15010},{"ID":15012},{"ID":15014},{"ID":15017},{"ID":15019},{"ID":15021},{"ID":15024},{"ID":15026},{"ID":15028},{"ID":15030},{"ID":15033},{"ID":15035},{"ID":15041},{"ID":15043},{"ID":15045},{"ID":15047},{"ID":15048},{"ID":15050},{"ID":15051},{"ID":15057},{"ID":15060},{"ID":15063},{"ID":15065},{"ID":15066},{"ID":15068},{"ID":15069},{"ID":15071},{"ID":15073},{"ID":15074},{"ID":15075},{"ID":15077},{"ID":15079},{"ID":15085},{"ID":15086},{"ID":15087},{"ID":15089},{"ID":15091},{"ID":15092},{"ID":15095},{"ID":15098},{"ID":15099},{"ID":15100},{"ID":15101},{"ID":15102},{"ID":15103},{"ID":15104},{"ID":15105},{"ID":15106},{"ID":15107},{"ID":15108},{"ID":15110},{"ID":15111},{"ID":15113},{"ID":15114},{"ID":15118},{"ID":15120},{"ID":15121},{"ID":15123},{"ID":15124},{"ID":15126},{"ID":15127},{"ID":15130},{"ID":15132},{"ID":15135},{"ID":15136},{"ID":15140},{"ID":15142},{"ID":15143},{"ID":15144},{"ID":15146},{"ID":15147},{"ID":15149},{"ID":15152},{"ID":15154},{"ID":15155},{"ID":15156},{"ID":15157},{"ID":15158},{"ID":15160},{"ID":15161},{"ID":15162},{"ID":15163},{"ID":15164},{"ID":15165},{"ID":15166},{"ID":15167},{"ID":15168},{"ID":15169},{"ID":15170},{"ID":15172},{"ID":15173},{"ID":15177},{"ID":15179},{"ID":15181},{"ID":15182},{"ID":15184},{"ID":15188},{"ID":15189},{"ID":15190},{"ID":15191},{"ID":15192},{"ID":15193},{"ID":15194},{"ID":15195},{"ID":15197},{"ID":15199},{"ID":15201},{"ID":15204},{"ID":15206},{"ID":15207},{"ID":15210},{"ID":15211},{"ID":15214},{"ID":15215},{"ID":15217},{"ID":15218},{"ID":15219},{"ID":15221},{"ID":15222},{"ID":15223},{"ID":15225},{"ID":15230},{"ID":15233},{"ID":15239},{"ID":15243},{"ID":15251},{"ID":15254},{"ID":15257},{"ID":15260},{"ID":15276},{"ID":15279},{"ID":15287},{"ID":15291},{"ID":15297},{"ID":15300},{"ID":15302},{"ID":15303},{"ID":15304},{"ID":15305}]

    const id = allArtworks[day]['ID'];
    // Create a loader while fetching data
    const loader = createLoader();



    artSection.appendChild(loader);


    try {

      let artwork;
      let art_manifest;
      let olddata;
      let artImage;

      if (state.hasArtID(String(id))) { // We have loaded the artwork before, no need to make a fetch request
        olddata = state.getArtState()[String(id)];
        artwork = olddata['art'];
        // console.log(olddata);
        art_manifest = olddata['manifest'];
        artImage = olddata['image'];
      }
      else { // Fetch artwork data
          artwork = await find_art(id, false);
          art_manifest = await find_manifest(id);
        if (artwork.data.image_id) {
          artImage = await find_art_image(artwork.data.image_id)
        } else {
          artImage = null;
        }
        state.addArt(String(id),{
          'art' : artwork,
          'manifest': art_manifest,
          'image': artImage
        })
      }

    
    // Remove the loader
    artSection.removeChild(loader);

    // Create an artwork card and add it to the DOM
    const card = displayDayArtwork({
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
      let artImage;
      let art_data;



      if (state.hasArtID(String(art_id))) { // We have loaded the artwork before, no need to make a fetch request
        olddata = state.getArtState()[String(art_id)];
        art_data = olddata['art'];
        art_manifest = olddata['manifest'];
        artImage = olddata['image'];
      }
      else { // Fetch artwork data
        art_data = await find_art(art_id);
        
        if (art_data.data.image_id) {
          artImage = await find_art_image(art_data.data.image_id);
          art_manifest = await find_manifest(art_id);
        } else {
          artImage = null;
          art_manifest = null;
        }
        state.addArt(String(artwork.id),{
          'art' : art_data,
          'manifest': art_manifest,
          'image': artImage
        })
      }

      let [card, status] = createNewArtwork({
        title: art_data.data.title,
        artists: art_data.data.artist_titles,
        arists_links: art_data.data.artist_ids,
        image: artImage,
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


