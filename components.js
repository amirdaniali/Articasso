// Module to create an artwork card
export function createArtworkCard(artwork) {
    const card = document.createElement('div');
    card.className = 'artwork-card'; // Styling will be in styles.css
    // todo: handle if the color is too black or dark
    card.style.background = `hsl(${artwork.color.h},${artwork.color.s}%,${artwork.color.l}%)`;
    // card.style.background = `pink`;

  
    // Add image
    const image = document.createElement('img');
    image.className = 'card-img';
    image.src = artwork.image || 'placeholder.jpg'; // Fallback image
    image.alt = artwork.title || 'Artwork';
    card.appendChild(image);
  
    // Add title
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = artwork.title || 'Untitled';
    card.appendChild(title);

    // Add id
    const id = document.createElement('a');
    id.className = 'card-id';
    id.title = `ID: ${artwork.id}`;
    id.href = `/${artwork.id}`;
    id.appendChild(document.createTextNode(`ID: ${artwork.id}`));
    card.appendChild(id);
  
    // Add artist
    const artists_wrapper = document.createElement('div');
    artists_wrapper.className = 'card-artists-wrapper';


    const artists_header = document.createElement('div');
    artists_header.className = 'card-header';
    artists_header.textContent =`Artists: `;
    artists_wrapper.appendChild(artists_header);


    const artists = document.createElement('ul');
    artists.className = 'card-ul';
    
    artwork.artists.forEach( (artist, index) => {
      const aLink = document.createElement('a');
      aLink.className = 'card-list-items';
      aLink.title = `${artist}`;
      aLink.href = `/artist/${artwork.arists_links[index]}`;
      aLink.appendChild(document.createTextNode(`${artist}`));
      const outer_list = document.createElement('li');
      outer_list.className = 'card-list-item';  
      outer_list.appendChild(aLink);
      artists.appendChild(outer_list);
    });
    artists_wrapper.appendChild(artists);
    card.appendChild(artists_wrapper);
  
    


    // Add Date
    const date_display = document.createElement('p');
    date_display.className = 'card-date'
    date_display.textContent = 'Date Displayed:' + (artwork.date || 'No Date Known');
    card.appendChild(date_display);




    // Add Description
    const description = document.createElement('div');
    description.className = 'card-description'
    description.innerHTML = '<b>Description: </b>' + ( artwork.description || 'No description available.');
    card.appendChild(description);


    // Add History
    // const history = document.createElement('div');
    // history.className = 'card-history';
    // history.innerHTML = 'Exhibition History: ' + artwork.history || 'No exhibition_history available.';
    // card.appendChild(history);

    // Add title
    const category_wrapper = document.createElement('div');
    category_wrapper.className = 'card-categories-wrapper';  
    const category_header = document.createElement('div');
    category_header.className = 'card-header';
    category_header.textContent =`  Categories(s): `;
    category_wrapper.appendChild(category_header);

    // Add categories
    const categories = document.createElement('ul');  
    categories.className = 'card-ul';  
    artwork.categories.forEach( (category, index) => {
      const aLink = document.createElement('a');
      aLink.title = `${category} `;
      aLink.href = `/category/${artwork.category_links[index]}`;
      aLink.appendChild(document.createTextNode(`${category}`));
      const outer_list = document.createElement('li');
      outer_list.className = 'card-list-item';  
      outer_list.appendChild(aLink);
      categories.appendChild(outer_list);
    });
    category_wrapper.appendChild(categories);
    card.appendChild(category_wrapper);



    return card;
  }
  
  // Module to create a post
  export function createPost(post) {
    const postContainer = document.createElement('div');
    postContainer.className = 'post-container'; // Styling will be in styles.css
  
    // Add title
    const title = document.createElement('h2');
    title.textContent = post.title || 'Untitled Post';
    postContainer.appendChild(title);
  
    // Add content
    const content = document.createElement('p');
    content.textContent = post.content || 'No content available.';
    postContainer.appendChild(content);
  
    // Add author
    const author = document.createElement('p');
    author.className = 'post-author'; // Optional style for author line
    author.textContent = `Posted by: ${post.author || 'Anonymous'}`;
    postContainer.appendChild(author);
  
    return postContainer;
  }
  
  // Module to create a generic loader (for "loading" placeholders)
  export function createLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader'; // Styling will be in styles.css
    loader.textContent = 'Loading...';
  
    return loader;
  }
  
  // Module to create an error message
  export function createErrorMessage(errorMessage) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message'; // Styling will be in styles.css
    errorContainer.textContent = errorMessage || 'An error occurred. Please try again.';
  
    return errorContainer;
  }
  
  // Module to create a search result item
  export function createSearchResultItem(item) {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item'; // Styling will be in styles.css
  
    const title = document.createElement('h3');
    title.textContent = item.title || 'No Title';
    resultItem.appendChild(title);
  
    const snippet = document.createElement('p');
    snippet.textContent = item.snippet || 'No additional information.';
    resultItem.appendChild(snippet);
  
    return resultItem;
  }
  
