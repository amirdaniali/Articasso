export class StateOLD {
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

export class State {
    // The artworks, artists, and categories are private variables caching the responses from the 
    // API to avoid fetching duplicates. 
    // The PreviousRoutes variable tracks which pages the user has seen before and which data
    // they have requested.
    // The private fields can only be accessed by the apropraite getter and setter methods.

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

    constructor() {
        this.dbName = "AppState";
        this.storeNames = ["artworksStore", "artistsStore", "categoriesStore"];
        this.cache = { artworksStore: {}, artistsStore: {}, categoriesStore: {} }; // Local cache of Fetched API resources
        this.initDB();
    }

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

    // Initialize IndexedDB with separate stores and indexes
    initDB() {
        let request = indexedDB.open(this.dbName, 1);
        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            this.storeNames.forEach((storeName) => {
                if (!db.objectStoreNames.contains(storeName)) {
                    let store = db.createObjectStore(storeName, { keyPath: "id" });
                    store.createIndex("nameIndex", "name", { unique: false });
                }
            });
        };
    }

    // Batch fetch multiple items in a single transaction
    async batchGetState(storeName, ids) {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(this.dbName);
            request.onsuccess = (event) => {
                let db = event.target.result;
                let transaction = db.transaction(storeName, "readonly");
                let store = transaction.objectStore(storeName);

                let results = {};
                ids.forEach(id => {
                    let getRequest = store.get(id);
                    getRequest.onsuccess = () => results[id] = getRequest.result ? getRequest.result.data : null;
                });

                transaction.oncomplete = () => resolve(results);
                transaction.onerror = () => reject(`Batch fetch failed for ${storeName}`);
            };
        });
    }

    // Optimized getState with cache
    async getState(storeName, id) {
        if (this.cache[storeName][id]) {
            return this.cache[storeName][id];
        }
        let data = await this.fetchFromDB(storeName, id);
        if (data) this.cache[storeName][id] = data; // Store in cache
        return data;
    }

    // Fetch data from IndexedDB
    async fetchFromDB(storeName, id) {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(this.dbName);
            request.onsuccess = (event) => {
                let db = event.target.result;
                let transaction = db.transaction(storeName, "readonly");
                let store = transaction.objectStore(storeName);
                let getRequest = store.get(id);

                getRequest.onsuccess = () => resolve(getRequest.result ? getRequest.result.data : null);
                getRequest.onerror = () => reject(`Failed to fetch data from ${storeName}`);
            };
        });
    }

    // Add or update an item in IndexedDB
    async updateState(storeName, id, data) {
        this.cache[storeName][id] = data; // Update cache
        let request = indexedDB.open(this.dbName);
        request.onsuccess = (event) => {
            let db = event.target.result;
            let transaction = db.transaction(storeName, "readwrite");
            let store = transaction.objectStore(storeName);
            store.put({ id, data });
        };
    }

    // Check if an item exists (using cache first)
    async hasItem(storeName, id) {
        return this.cache[storeName][id] !== undefined || await this.fetchFromDB(storeName, id) !== null;
    }

    
    async addItem(storeName, id, data) {
        // returns void
        let exists = await this.hasItem(storeName, id);
        if (!exists) { // Add new data only if it doesn't exist
            this.updateState(storeName, id, data);
        }
    }

    // Remove an item and clear cache
    async removeItem(storeName, id) {
        delete this.cache[storeName][id]; // Remove from cache
        let request = indexedDB.open(this.dbName);
        request.onsuccess = (event) => {
            let db = event.target.result;
            let transaction = db.transaction(storeName, "readwrite");
            let store = transaction.objectStore(storeName);
            store.delete(id);
        };
    }
}
