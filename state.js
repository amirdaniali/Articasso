export class State {
    // The artworks, artists, and categories are private variables caching the responses from the 
    // API to avoid fetching duplicates. 
    // The PreviousRoutes variable tracks which pages the user has seen before and which data
    //  they have requested.
    // The private fields can only be accessed by the apropraite getter and setter methods.
    static artworks = new Object();
    static artists = new Object();
    static categories = new Object();

    // In order to remember where the user has been before and what they have done we store this variable
    // Format {url_fieldA: [url_state_1, url_state_2,...], url_fieldB : ...}
    static previousRoutes = { 
        'art': [],
        'artist': [],
        'category': [], 
        'art_search': [],
        'artist_search': [],
        'category_search': []
};

    getPreviousRoutes(){
        // get the list of internal links the user has clicked along with ids based on the preiousRoutes above
        return State.previousRoutes;
    }

    getLastVisitedField(field){
        // Get the last index for the field needed. Useful for quickly showing the user previous pages.
        return State.previousRoutes[field].at(-1) ;
    }

    addRoute(field, newRoute){
        // Once the user clicks an explicit-outbound link or requests a new page its is added here.
        State.previousRoutes[field].push(newRoute);
    }

    addArt(new_id,new_data) {
        // Used for caching the result of api calls to the artic database.
        // Returns void
        if (State.artworks.hasOwnProperty(new_id)) {
        }
        else {
            State.artworks[new_id] = new_data;
        }
    }

    getArtState(){
        // Used for caching the result of api calls to the artic database.
        // Returns fetched artwork data
        return State.artworks;
    }

    hasArtID(new_id){
        // Used for caching the checking if there is a cache of fetched data
        // Returns true or false
        return State.artworks.hasOwnProperty(new_id);
    }

    removeArtID(new_id){
        // Used for removing a bad cache.
        // Returns void
        delete State.artworks[new_id];
    }


    addArtist(new_id,new_data) {
        // Used for caching the result of api calls to the artic database.
        // Returns void
        if (State.artists.hasOwnProperty(new_id)) {
        }
        else {
            State.artists[new_id] = new_data;
        }
    }

    getArtistState(){
        // Used for caching the result of api calls to the artic database.
        // Returns fetched artist data
        return State.artists;
    }

    hasArtistID(new_id){
        // Used for caching the checking if there is a cache of fetched data
        // Returns true or false
        return State.artists.hasOwnProperty(new_id);
    }

    removeArtistID(new_id){
        // Used for removing a bad cache.
        // Returns void
        delete State.artworks[new_id];
    }


    addCategory(new_id,new_data) {
        // Used for caching the result of api calls to the artic database.
        // Returns void
        if (State.categories.hasOwnProperty(new_id)) {
        }
        else {
            State.categories[new_id] = new_data;
        }
    }

    getCategoryState(){
        // Used for caching the result of api calls to the artic database.
        // Returns fetched artwork data
        return State.categories;
    }

    hasCategoryID(new_id){
        // Used for caching the checking if there is a cache of fetched data
        // Returns true or false
        return State.categories.hasOwnProperty(new_id);
    }

    removeCategoryID(new_id){
        // Used for removing a bad cache.
        // Returns void
        delete State.categories[new_id];
    }

}


