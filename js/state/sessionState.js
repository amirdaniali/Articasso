export class sessionState {

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
        return sessionState.previousRoutes;
    }

    getLastVisitedField(field){
        // Get the last index for the field needed. Useful for quickly showing the user previous pages.
        return sessionState.previousRoutes[field].at(-1) ;
    }

    addRoute(field, newRoute){
        // Once the user clicks an SPA-link link or requests a new page its is added here.
        sessionState.previousRoutes[field].push(newRoute);
    }

}
