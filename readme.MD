#  Advanced Pre-Work Assignment

![First Page](./media/HomePage.jpg "First Page of the webapp")

My name is Amir Daniali and this is my Advanced Pre-Work Assignment submission for Summer 2025 Code the Dream course.

You can find a link to the Assignment [here](https://codethedream.org/open-adv-pre-work/)

## How to Run 

First download this repository with
```git
git clone https://github.com/amirdaniali/Code-The-Dream.git
```

### Serving Using NPM

Then you need to be able to serve the files locally. One way is by using `node.js` and `http-server`:

#### On Linux, Mac
```Bash
 cd path/to/the/project
 npm install -g http-server
 http-server
 ```

#### if http-server not Installed with -g  

```bash
   cd path/to/the/project
   npm install http-server
   ./node_modules/.bin/http-server
```

 You can then access the application on http://localhost:8080 or http://127.0.0.1:8080

The above steps should be reproducible in vscode and windows terminal on windows. For linux or mac the path to the node module could be different. You can download Node.js from [nodejs.org](https://nodejs.org/)

### Python

Alternatively the static files can be served via a `python` `http.server`. You can open `serve.py` from the project directory via your IDE, change the path paramether to where you downloaded the project and run:

```bash
python ./serve.py
```

Or

```bash
py serve.py
```

You can then access the application on http://localhost:8080 or http://127.0.0.1:8080

Should you run into any issues serving the files you can view the project screenshot in the media folder of this repository. Alternatively you can view the final project hosted via github pages on my personal website [here](https://artic-arts.amirdaniali.com).

## Design Decisions

During the completion of this assignment here are all the issues I came across and all the and design decisions I made. 

### API Options
The options for the APIs in the course are as follows:
- Weather
- Music
- Star Wars
- Marvel Comics
- Art
- Dog/Cat
- Coffee

I had to choose between different api providers and build an app around them. I am a fan of Arts and wouldnt say no to an excuse to build something useful that pleases the spirit as well. So I took a look at the ARTIC Api from Art Institute of Chicago.

Here is the [Website](https://www.artic.edu/) of Art Institute of Chicago.
![Art Institute of Chicago Website](./media/ART_Chicago_Website.png "Art Institute of Chicago Website")

And Here is the link to the [API Documentation](https://api.artic.edu/docs/#introduction). 
![API Documentation](./media/Dcoumentation_Screenshot.png "Art Institute of Chicago API Dcoumentation")

The Project I wanted to make needed to demonstrate the data from at least two endpoints from the api, and allow the user to navigate through them. Since the data already exists I made the design choice to Keep all code in the front-end and didnt feel the need to complicate the logic via a backend. The hope for this project is one day this project can exist in a website somewhere forever without incurring needless server costs. 

### The Architecture

I decide on this following architecture.

1. `index.html`:
   - Purpose: The main HTML file for the application. Contains the structure and links to JavaScript and  CSS files.
   - Description: Serves as the entry point and root for the application UI.

2. `styles.css`:
   - Purpose: CSS imports and custom styling.
   - Description: Sets up styling rules, adding any additional customizations needed.

3. `app.js`:
   - Purpose: Main JavaScript file handling API calls, state management, and DOM updates.
   - Description:
     - Fetches data from the Artic API.
     - Stores state in local variables.
     - Dynamically updates the UI based on user interactions.

4. `helpers.js`:
   - Purpose: Contains helper functions.
   - Description:
     - Functions for API calls (e.g., fetching data).
     - Utility functions like error handling or formatting.

5. `components.js`:
   - Purpose: Encapsulates reusable JavaScript components.
   - Description:
     - Contains functions to create dynamic HTML elements (like artwork cards, search bars).
     - Helps maintain modularity in code.
6. `routes.js`
   - Purpose: Allows the user to view parts of the application by simple clicks. 
   - Description:
     - Contains functions to analyse click events and route them to the proper destinations.
     - Calls the proper functions in `app.js` to populate pages with the correct data.


This is a diagram I made for the way different parts of the project interact:
![Diagram](./media/Initial%20Architecture.png "Initial Architecture")

### Seting up the Controller and View

After reading the api I started coding. I was a little rusty in my JavaScript so it took me a little longer than usual to read the documentations. I managed to code the helper functions that interact with the api in the helpers.js file. The helper functions use the JavaScript Fetch syntax and are all async. 

The only major issue I ran into initially was that the Artic Api doesnt actually return any images (except the thumbnail. They return the image id and the image has to be linked to using a html `<img>` tag. For awhile I kept trying to use javascript to fetch the images from the server programmitaclly, but I kept running into CORS errors. After a long search online about workarounds, I decided to make normal html do the work.

Here is the function I wrote using javascript to fetch the resource from the api:

```javascript
export async function find_art(id = 129884, all_fields = true) {
    console.log('find art initialized with parameter',id);
    const address_parameters = all_fields ? '' : '?fields=id,title,artist_titles,artist_ids,date_display,description,exhibition_history,thumbnail,color,category_titles,category_ids,image_id'
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}${address_parameters}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'Code the Dream Prework @amirdaniali@gh'
        }});
    
    const data = await returnResponse.json();
    console.log('art with id', id,'was found', data);

    return data
}
```

In the lines above the function determines if a reduced set of fields are requested or not. Then it fetches the resource and returns the data. I got distracted while coding the fuction to set a custom `AIC-User-Agent` header as requested by [the documentation](https://api.artic.edu/docs/#image-sizes). I got so distracted I didnt include a try/catch statement in the function until much later. 

Afterwards I began coding the `app.js` file where I setup the interactivity of the main page and made sure the search box was connected to the helper functions to retrieve the user information. After that I started coding the `components.js` file to produce the results of the user searches. 

### Setting Up The Single Page Application

The application I wanted to build had to have many pages. One for Showing the main page, one for showing the page related to the art-pieces themselves and maybe one especially for each artist. Such functionality would require multiple `page.html` files and a complex way of routing them without needing complex express/node backends. At the end I decided to go with a SPA concept I learned from this [blog](https://dev.to/thedevdrawer/single-page-application-routing-using-hash-or-url-9jh)

All routing logic is implemented in `routes.js` file and allows for multiple pages to be loaded with browser URL functionality supported. 

Whenever a new link to a page is clicked, the `routes.js` file checks to see if the element has the class-name: `explicit-outband`. If so it ignores the default behavior of the browser and loads the contexts of the local page into the `main-container` section tag in the main `index.html` file. If it cannot find the classname it treats it as a normal `<a>` tag and allows the link to redirect to another url. 

```javascript
const route = (event) => {
    event = event || window.event; // get window.event if event argument not provided
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
};

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
    if (e.explicitOriginalTarget.className.includes("explicit-outbound") ){
        e.preventDefault();
        route();
    }
    // console.log('target not a link');
    
});

locationHandler();
window.onpopstate = locationHandler;
window.route = route;
```

And here is how the locationHandler function is set up. I ommitted some of the longer logic blocs in the switch case for brevity. 


```javascript
export async function locationHandler() {


    const location = window.location.pathname; // get the url path
    
    // if the path length is 0, set it to primary page route
    let currentView = ['/','']
    if (location.length == 0) {
        location = "/";
    }
    else{ 
        currentView = location.split('/');
        currentView.splice(0, 1);       
    }
    
    // get the route object from the routes object
    const route = routes[currentView[0]] || routes["404"];
    // get the html from the template
    const html = await fetch(route.template).then((response) => response.text());
    // set the content of the content div to the html
    
   // prepare the wrapper section and remove the current view

    document.getElementById("main-container").innerHTML = '';
    document.getElementById("main-container").innerHTML = html; 

      // Furthur down:
    
    switch (currentView[0]) {
        case '':
            console.log('Home Loaded.')
            populatePage();
            displayArtworkofDay();
            displayCuratedlist();
            break;
         case 'art':
            // displayArt(); // Also do alot more stuff
            break;
         case 'artist':
            // displayArtist();
            break;
         case 'about':
            // displayAbout();
            break;
        case 'category':
            // displayCategory();
            break;
         
}}

```

After loading the custom resources for any page `routes.js` calls multiple functions in `app.js` to load the interactivity of the proper page the user has requested. `app.js` then can call `helpers.js` to request the resources from the ARTIC API and then call `components.js` to display the resources to the user. 


### Components

Here is how components are structured. I have a `<section>` element in the main `index.html` file. The `routes.js` file injects the main wrapper inside that `<section>` element. After that `components.js` injects every needed element into the `section`.

Here is an example logic displaying the artwork page.

```javascript

// app.js

export async function displayArtworkPage(id) {
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
    
    // catch stamenet for error handling is placed here
    
}}}

```

```javascript
// components.js

// Module to create an artwork display
export function displayArtwork(artwork, artwork_manifest= null) {
  const card = document.createElement('div');
  card.className = 'artwork-display'; // Styling will be in styles.css
  
  // Change the backgroud color if image colors are available

  try {
    card.style.background = `hsl(${artwork.color.h},${artwork.color.s}%,${artwork.color.l}%)`;
  } catch (error) {
    card.style.background = '#aaa';
  }


  // Add image
  const imagewrapper = document.createElement('div');
  const image = document.createElement('img');
  imagewrapper.className = 'image-wrapper';

  // handle if image data isn't available from the api
  image.className = 'display-img ';
  if (!artwork.image) {
    console.log(`Image for id: ${artwork.id} not available from API. Fetching placeholder image.`);
  }
  image.src = artwork.image || '/media/placeholder.jpg'; // Fallback image
  image.alt = '--Image Not Available--' || 'Artwork';

  // handle cors errors from the server

  image.addEventListener('error', function handleError() {

    console.log(image.src, 'not available from the ARTIC server. Fetching placeholder image.');
    const defaultImage = '/media/placeholder.jpg';
  
      image.src = defaultImage;
      image.alt = 'default';
      
  });
  

  imagewrapper.appendChild(image);
  card.appendChild(imagewrapper);

  // sample logic for all elements is shown here
  // Add artist id to the card

  const id = document.createElement('a');
  id.title = `ID: ${artwork.id}`;
  id.className = 'display-id';
  // id.href = `/art/${artwork.id}`;
  id.appendChild(document.createTextNode(`ID: ${artwork.id}`));
  card.appendChild(id);

  // Add title
  // Add Date
  // Add artist
  // Add Description
  // Add title
  // Add categories

  return card;
}
```

### Art of the day.

Something I'm very happy to get the chance to add to the project is the artwork of the day section. 

A problem with the api is simply that not every random id exists. When I tried a logic like `find_art(100000+dayofYear)` I simply ran into 404 issues. As a result after trying a few times with different initial ids, I simply gave up and tried another approach. 

In the final version, I started by simply going over every single artwork id after an initial number. If the artwork exists I added it to the final selected elements list. 

Afterwards I coded the date handling logic like this:

```javascript

const artSection = document.getElementById('art-of-the-day');
const now = new Date();
const start = new Date(now.getFullYear(), 0, 0);
const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
const oneDay = 1000 * 60 * 60 * 24;
const day = Math.floor(diff / oneDay);

const allArtworks = // A very long list of IDS for each day.


const id = allArtworks[day]['ID'];
const artwork = await find_art(id, false);
const card = displayDayArtwork(artwork);
artSection.appendChild(card);

```


## Conclusion

By using the architecture mentioned above I can make multiple pages just behave like static files and besides needing a service to load the files, no resource is wasted with unneeded computations. All logic is client-side and the project can be used with minimal costs as long as the ARTIC Api remains online. 

This project helped me greatly to think outside the box to recreate the typical luxuries we use everyday granted to us by frameworks like React or Vue inside pure javascript. 

I thank Code the Dream team to inspire me to create this project celebrating the beautiful art collection of the Art Institute of Chicago.


Reminder: You can view the website and the project on my personal website [here](https://artic-arts.amirdaniali.com).

## Todo: 

If I return to this project in the future here is the list of things I'd love to add to the functionality of the website.

- Find a way to show artist work. Unfortunately I couldnt find anyway so far to show which arts were made by which artists to populate their pages. I have already made the component that those possible results will be placed at. I hope I can find a way to show the arts made by each artist in their own page somehow. 
- Add back forward functionality to the pages so by changing pages back to where you have been you see the arts you saw before. 
- Add load more buttons