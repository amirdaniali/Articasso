#  Advanced Pre-Work Assignment

My name is Amir Daniali and this is my Advanced Pre-Work Assignment submission for Summer 2025 Code the Dream course.

You can find a link to the Assignment [here](https://codethedream.org/open-adv-pre-work/)

## How to Run 

First download this repository with
```git
git clone .....
```

Then run

```
npm run
```
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