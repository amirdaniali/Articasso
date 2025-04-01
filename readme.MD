#  Advanced Pre-Work Assignment

My name is Amir Daniali and this is my Advanced Pre-Work Assignment submission for Summer 2025 Code the Dream course.

You can find a link to the Assignment [here](https://codethedream.org/open-adv-pre-work/)

## How to Run 

First download this repository with
```git
git clone https://github.com/amirdaniali/Code-The-Dream.git
```

Then open the project with vscode and open index.html via live server. Server functionality with node will come soon. 


<!-- You can clone the repository via this link .... -->

<!-- then run.... -->

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