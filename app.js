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

      if (artwork.data.image_id) {
        var artImage = await find_art_image(artwork.data.image_id)
      } else {
        var artImage = null;
      }
    
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
    const newArtworks = await find_recent_artworks(limit);

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

    if (artist_artworks.data.length) {
      const artist_arts_header = document.createElement('h2');
      artist_arts_header.className = 'artist-arts-header';
      artist_arts_header.textContent =`Here are the arts created by this artist:`;
      artistInfo.appendChild(artist_arts_header);
    }
      
    for (let index = 0; index < artist_artworks.data.length; index++) {
        let artwork = artist_artworks.data[index];
        let api_link = artwork.api_link;
        let art_id = artwork.id;

        let loader = createLoader();
        artistGrid.appendChild(loader);

        let art_data = await find_art(art_id);
        
        if (art_data.data.image_id) {
          var artImage = await find_art_image(art_data.data.image_id);
          var art_manifest = await find_manifest(art_id);
        } else {
          var artImage = null;
          var art_manifest = null;
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
    const loader = createLoader();
    categoryInfo.appendChild(loader);
    const category = await find_category(id);
          
    categoryInfo.removeChild(loader);


    const card = createCategoryInfo(category);
    categoryInfo.appendChild(card);

    const category_artworks = await find_category_arts(category.data.title);

    if (category_artworks.data.length) {
      const category_arts_header = document.createElement('h2');
      category_arts_header.className = 'category-arts-header';
      category_arts_header.textContent =`Here are the arts with this category:`;
      categoryInfo.appendChild(category_arts_header);
    }
      
    for (let index = 0; index < category_artworks.data.length; index++) {
        let artwork = category_artworks.data[index];
        let api_link = artwork.api_link;
        let art_id = artwork.id;

        let loader = createLoader();
        categoryGrid.appendChild(loader);

        let art_data = await find_art(art_id);
        
        if (art_data.data.image_id) {
          var artImage = await find_art_image(art_data.data.image_id);
          var art_manifest = await find_manifest(art_id);
        } else {
          var artImage = null;
          var art_manifest = null;
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
    4884,
    27992,
    86385,
    14572,
    129884,
    5580,
    11723,
    31816,
    187528, 
    55494,
    64729,
    151108,
    45418,
    80084,
    61428,
    28067,
  ];

  // Display an artwork for each id
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




// Function to display artwork cards
export async function displayArtworkPage(id) {
  try {
    const artworksSection = document.getElementById('artworks');
    const artInfo = document.getElementById('art-info');
    // Create a loader while fetching data
    const loader = createLoader();
    artworksSection.appendChild(loader);
    try {
      // Fetch artwork data
    const artwork = await find_art(id, false);
    const art_manifest = await find_manifest(id);
      if (artwork.data.image_id) {
        var artImage = await find_art_image(artwork.data.image_id)
      } else {
        var artImage = null;
      }

    // Remove the loader
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



// This is the function I wrote to come up with 370 functioning art IDs so I can have one 'art-of-the-day' for each day in the year. 
export async function test_ids() {
  console.log('Test Ids Initiated.');
  const initial_id = 14591;
  const status = {};
  status.Ok = [];
  status.Bad = [];
  var index = 0
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
  for (let index = 0; index < status.Ok.length; index++) {
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


    // These artwork ids were generated by the test_ids() function by setting different initial seeds. 
    const allArtworks = [{"ID":22222},{"ID":22223},{"ID":22224},{"ID":22225},{"ID":22226},{"ID":22228},{"ID":22229},{"ID":22231},{"ID":22232},{"ID":22234},{"ID":22235},{"ID":22238},{"ID":22239},{"ID":22240},{"ID":22244},{"ID":22245},{"ID":22247},{"ID":22248},{"ID":22250},{"ID":22251},{"ID":22254},{"ID":22256},{"ID":22257},{"ID":22258},{"ID":22259},{"ID":22260},{"ID":22261},{"ID":22262},{"ID":22263},{"ID":22264},{"ID":22265},{"ID":22266},{"ID":22267},{"ID":22268},{"ID":22269},{"ID":22270},{"ID":22271},{"ID":22272},{"ID":22273},{"ID":22275},{"ID":22276},{"ID":22278},{"ID":22279},{"ID":22280},{"ID":22281},{"ID":22282},{"ID":22283},{"ID":22285},{"ID":22287},{"ID":22288},{"ID":22289},{"ID":22291},{"ID":22292},{"ID":22294},{"ID":22296},{"ID":22297},{"ID":22300},{"ID":22303},{"ID":22306},{"ID":22309},{"ID":22312},{"ID":22316},{"ID":22317},{"ID":22319},{"ID":22322},{"ID":22323},{"ID":22327},{"ID":22329},{"ID":22332},{"ID":22333},{"ID":22334},{"ID":22337},{"ID":22338},{"ID":22340},{"ID":22341},{"ID":22343},{"ID":22344},{"ID":22345},{"ID":22347},{"ID":22348},{"ID":22349},{"ID":22350},{"ID":22354},{"ID":22356},{"ID":22357},{"ID":22361},{"ID":22362},{"ID":22366},{"ID":22367},{"ID":22369},{"ID":22370},{"ID":22371},{"ID":22373},{"ID":22374},{"ID":22376},{"ID":22379},{"ID":22380},{"ID":22382},{"ID":22384},{"ID":22385},{"ID":22387},{"ID":22388},{"ID":22390},{"ID":22391},{"ID":22393},{"ID":22394},{"ID":22395},{"ID":22400},{"ID":22401},{"ID":22402},{"ID":22408},{"ID":22409},{"ID":22410},{"ID":22413},{"ID":22416},{"ID":22418},{"ID":22420},{"ID":22426},{"ID":22427},{"ID":22429},{"ID":22430},{"ID":22433},{"ID":22437},{"ID":22440},{"ID":22442},{"ID":22443},{"ID":22444},{"ID":22446},{"ID":22449},{"ID":22450},{"ID":22451},{"ID":22452},{"ID":22453},{"ID":22454},{"ID":22455},{"ID":22457},{"ID":22459},{"ID":22460},{"ID":22461},{"ID":22464},{"ID":22467},{"ID":22468},{"ID":22470},{"ID":22471},{"ID":22472},{"ID":22473},{"ID":22475},{"ID":22476},{"ID":22479},{"ID":22480},{"ID":22482},{"ID":22483},{"ID":22484},{"ID":22485},{"ID":22486},{"ID":22490},{"ID":22491},{"ID":22492},{"ID":22494},{"ID":22495},{"ID":22496},{"ID":22498},{"ID":22500},{"ID":22502},{"ID":22503},{"ID":22504},{"ID":22505},{"ID":22506},{"ID":22508},{"ID":22509},{"ID":22511},{"ID":22513},{"ID":22515},{"ID":22517},{"ID":22519},{"ID":22520},{"ID":22521},{"ID":22522},{"ID":22523},{"ID":22525},{"ID":22526},{"ID":22527},{"ID":22528},{"ID":22529},{"ID":22530},{"ID":22531},{"ID":22532},{"ID":22534},{"ID":22535},{"ID":22537},{"ID":22538},{"ID":22539},{"ID":22540},{"ID":22541},{"ID":22543},{"ID":22544},{"ID":22545},{"ID":22546},{"ID":22547},{"ID":22548},{"ID":22549},{"ID":22550},{"ID":22553},{"ID":22556},{"ID":22557},{"ID":22559},{"ID":22561},{"ID":22562},{"ID":22563},{"ID":22564},{"ID":22565},{"ID":22566},{"ID":22567},{"ID":22568},{"ID":22569},{"ID":22570},{"ID":22573},{"ID":22574},{"ID":22576},{"ID":22579},{"ID":22583},{"ID":22584},{"ID":22585},{"ID":22586},{"ID":22588},{"ID":22589},{"ID":22590},{"ID":22591},{"ID":22592},{"ID":22594},{"ID":22595},{"ID":22596},{"ID":22598},{"ID":22599},{"ID":22601},{"ID":22602},{"ID":22604},{"ID":22605},{"ID":22607},{"ID":22608},{"ID":22610},{"ID":22611},{"ID":22612},{"ID":22613},{"ID":22615},{"ID":22617},{"ID":22618},{"ID":22619},{"ID":22620},{"ID":22621},{"ID":22624},{"ID":22625},{"ID":22626},{"ID":22627},{"ID":22628},{"ID":22630},{"ID":22631},{"ID":22632},{"ID":22633},{"ID":22634},{"ID":22635},{"ID":22636},{"ID":22637},{"ID":22638},{"ID":22639},{"ID":22640},{"ID":22641},{"ID":22642},{"ID":22643},{"ID":22644},{"ID":22645},{"ID":22646},{"ID":22647},{"ID":22648},{"ID":22649},{"ID":22650},{"ID":22651},{"ID":22652},{"ID":22653},{"ID":22654},{"ID":22655},{"ID":22656},{"ID":22657},{"ID":22658},{"ID":22660},{"ID":22661},{"ID":22663},{"ID":22664},{"ID":22666},{"ID":22667},{"ID":22668},{"ID":22669},{"ID":22670},{"ID":22671},{"ID":22673},{"ID":22674},{"ID":22675},{"ID":22677},{"ID":22679},{"ID":22680},{"ID":22681},{"ID":22682},{"ID":22683},{"ID":22684},{"ID":22685},{"ID":22686},{"ID":22687},{"ID":22688},{"ID":22689},{"ID":22690},{"ID":22691},{"ID":22692},{"ID":22693},{"ID":22694},{"ID":22695},{"ID":22696},{"ID":22697},{"ID":22698},{"ID":22699},{"ID":22700},{"ID":22701},{"ID":22702},{"ID":22703},{"ID":22704},{"ID":22705},{"ID":22706},{"ID":22707},{"ID":22708},{"ID":22709},{"ID":22710},{"ID":22711},{"ID":22712},{"ID":22713},{"ID":22714},{"ID":22715},{"ID":22716},{"ID":22717},{"ID":22718},{"ID":22719},{"ID":22720},{"ID":22721},{"ID":22722},{"ID":22723},{"ID":22724},{"ID":22725},{"ID":22726},{"ID":22727},{"ID":22728},{"ID":22729},{"ID":22730},{"ID":22731},{"ID":22732},{"ID":22733},{"ID":22734},{"ID":22735},{"ID":22736},{"ID":22737},{"ID":22738},{"ID":22739},{"ID":22740},{"ID":22741},{"ID":22742},{"ID":22743},{"ID":22744},{"ID":22745},{"ID":22746},{"ID":22748},{"ID":22749},{"ID":22750},{"ID":22751}]
    const allArtworks2 = [{"ID":14591},{"ID":14592},{"ID":14593},{"ID":14594},{"ID":14598},{"ID":14601},{"ID":14603},{"ID":14605},{"ID":14619},{"ID":14620},{"ID":14624},{"ID":14626},{"ID":14630},{"ID":14633},{"ID":14634},{"ID":14643},{"ID":14644},{"ID":14647},{"ID":14648},{"ID":14649},{"ID":14650},{"ID":14655},{"ID":14664},{"ID":14665},{"ID":14667},{"ID":14668},{"ID":14669},{"ID":14670},{"ID":14672},{"ID":14674},{"ID":14675},{"ID":14676},{"ID":14677},{"ID":14678},{"ID":14679},{"ID":14681},{"ID":14683},{"ID":14684},{"ID":14686},{"ID":14687},{"ID":14688},{"ID":14689},{"ID":14690},{"ID":14691},{"ID":14692},{"ID":14693},{"ID":14694},{"ID":14695},{"ID":14696},{"ID":14697},{"ID":14698},{"ID":14699},{"ID":14700},{"ID":14701},{"ID":14702},{"ID":14703},{"ID":14704},{"ID":14705},{"ID":14707},{"ID":14708},{"ID":14709},{"ID":14710},{"ID":14711},{"ID":14713},{"ID":14714},{"ID":14715},{"ID":14720},{"ID":14721},{"ID":14727},{"ID":14729},{"ID":14730},{"ID":14731},{"ID":14732},{"ID":14733},{"ID":14734},{"ID":14736},{"ID":14737},{"ID":14739},{"ID":14740},{"ID":14743},{"ID":14745},{"ID":14746},{"ID":14748},{"ID":14749},{"ID":14752},{"ID":14753},{"ID":14755},{"ID":14757},{"ID":14758},{"ID":14761},{"ID":14762},{"ID":14763},{"ID":14764},{"ID":14765},{"ID":14766},{"ID":14767},{"ID":14768},{"ID":14770},{"ID":14771},{"ID":14772},{"ID":14773},{"ID":14774},{"ID":14775},{"ID":14780},{"ID":14781},{"ID":14782},{"ID":14783},{"ID":14786},{"ID":14787},{"ID":14788},{"ID":14789},{"ID":14790},{"ID":14792},{"ID":14794},{"ID":14795},{"ID":14796},{"ID":14797},{"ID":14798},{"ID":14799},{"ID":14803},{"ID":14804},{"ID":14805},{"ID":14806},{"ID":14808},{"ID":14809},{"ID":14810},{"ID":14811},{"ID":14812},{"ID":14813},{"ID":14814},{"ID":14815},{"ID":14816},{"ID":14817},{"ID":14818},{"ID":14819},{"ID":14820},{"ID":14821},{"ID":14822},{"ID":14825},{"ID":14827},{"ID":14830},{"ID":14831},{"ID":14833},{"ID":14834},{"ID":14835},{"ID":14837},{"ID":14838},{"ID":14839},{"ID":14840},{"ID":14842},{"ID":14844},{"ID":14845},{"ID":14846},{"ID":14847},{"ID":14848},{"ID":14849},{"ID":14850},{"ID":14851},{"ID":14852},{"ID":14853},{"ID":14854},{"ID":14855},{"ID":14856},{"ID":14857},{"ID":14858},{"ID":14859},{"ID":14860},{"ID":14861},{"ID":14862},{"ID":14863},{"ID":14864},{"ID":14865},{"ID":14866},{"ID":14867},{"ID":14869},{"ID":14871},{"ID":14873},{"ID":14874},{"ID":14877},{"ID":14878},{"ID":14880},{"ID":14882},{"ID":14884},{"ID":14889},{"ID":14890},{"ID":14891},{"ID":14892},{"ID":14893},{"ID":14894},{"ID":14895},{"ID":14896},{"ID":14898},{"ID":14900},{"ID":14901},{"ID":14904},{"ID":14906},{"ID":14908},{"ID":14910},{"ID":14912},{"ID":14916},{"ID":14917},{"ID":14919},{"ID":14925},{"ID":14927},{"ID":14929},{"ID":14930},{"ID":14931},{"ID":14932},{"ID":14933},{"ID":14934},{"ID":14935},{"ID":14936},{"ID":14937},{"ID":14938},{"ID":14940},{"ID":14941},{"ID":14943},{"ID":14946},{"ID":14948},{"ID":14959},{"ID":14966},{"ID":14968},{"ID":14970},{"ID":14973},{"ID":14975},{"ID":14977},{"ID":14983},{"ID":14987},{"ID":14992},{"ID":14993},{"ID":14995},{"ID":15010},{"ID":15012},{"ID":15014},{"ID":15017},{"ID":15019},{"ID":15021},{"ID":15024},{"ID":15026},{"ID":15028},{"ID":15030},{"ID":15033},{"ID":15035},{"ID":15041},{"ID":15043},{"ID":15045},{"ID":15047},{"ID":15048},{"ID":15050},{"ID":15051},{"ID":15057},{"ID":15060},{"ID":15063},{"ID":15065},{"ID":15066},{"ID":15068},{"ID":15069},{"ID":15071},{"ID":15073},{"ID":15074},{"ID":15075},{"ID":15077},{"ID":15079},{"ID":15085},{"ID":15086},{"ID":15087},{"ID":15089},{"ID":15091},{"ID":15092},{"ID":15095},{"ID":15098},{"ID":15099},{"ID":15100},{"ID":15101},{"ID":15102},{"ID":15103},{"ID":15104},{"ID":15105},{"ID":15106},{"ID":15107},{"ID":15108},{"ID":15110},{"ID":15111},{"ID":15113},{"ID":15114},{"ID":15118},{"ID":15120},{"ID":15121},{"ID":15123},{"ID":15124},{"ID":15126},{"ID":15127},{"ID":15130},{"ID":15132},{"ID":15135},{"ID":15136},{"ID":15140},{"ID":15142},{"ID":15143},{"ID":15144},{"ID":15146},{"ID":15147},{"ID":15149},{"ID":15152},{"ID":15154},{"ID":15155},{"ID":15156},{"ID":15157},{"ID":15158},{"ID":15160},{"ID":15161},{"ID":15162},{"ID":15163},{"ID":15164},{"ID":15165},{"ID":15166},{"ID":15167},{"ID":15168},{"ID":15169},{"ID":15170},{"ID":15172},{"ID":15173},{"ID":15177},{"ID":15179},{"ID":15181},{"ID":15182},{"ID":15184},{"ID":15188},{"ID":15189},{"ID":15190},{"ID":15191},{"ID":15192},{"ID":15193},{"ID":15194},{"ID":15195},{"ID":15197},{"ID":15199},{"ID":15201},{"ID":15204},{"ID":15206},{"ID":15207},{"ID":15210},{"ID":15211},{"ID":15214},{"ID":15215},{"ID":15217},{"ID":15218},{"ID":15219},{"ID":15221},{"ID":15222},{"ID":15223},{"ID":15225},{"ID":15230},{"ID":15233},{"ID":15239},{"ID":15243},{"ID":15251},{"ID":15254},{"ID":15257},{"ID":15260},{"ID":15276},{"ID":15279},{"ID":15287},{"ID":15291},{"ID":15297},{"ID":15300},{"ID":15302},{"ID":15303},{"ID":15304},{"ID":15305}]

    const id = allArtworks2[day]['ID'];
    // Create a loader while fetching data
    const loader = createLoader();
    artSection.appendChild(loader);
    try {
      // Fetch artwork data
    const artwork = await find_art(id, false);
    const art_manifest = await find_manifest(id);

      if (artwork.data.image_id) {
        var artImage = await find_art_image(artwork.data.image_id)
      } else {
        var artImage = null;
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

    const searchresults = await search_arts(search_term);
      
    for (let index = 0; index < searchresults.data.length; index++) {
        let artwork = searchresults.data[index];
        let api_link = artwork.api_link;
        let art_id = artwork.id;

        let loader = createLoader();
        artworksSection.appendChild(loader);

        let art_data = await find_art(art_id);
        
        if (art_data.data.image_id) {
          var artImage = await find_art_image(art_data.data.image_id);
          var art_manifest = await find_manifest(art_id);
        } else {
          var artImage = null;
          var art_manifest = null;
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

    const searchresults = await search_artists(search_term);
      
    for (let index = 0; index < searchresults.data.length; index++) {
        let artist = searchresults.data[index];

        let loader = createLoader();
        artistsSection.appendChild(loader);

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
  try {
    const categorySection = document.getElementById('category-grid');

    const searchresults = await search_categories(search_term);
      
    for (let index = 0; index < searchresults.data.length; index++) {
        let category = searchresults.data[index];

        let loader = createLoader();
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