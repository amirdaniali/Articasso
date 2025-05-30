export class State {
    static artworks = new Object();
    static artists = new Object();
    static categories = new Object();

    constructor() {
        
    }

    addArt(new_id,new_data) {
        if (State.artworks.hasOwnProperty(new_id)) {
        }
        else {
        State.artworks[new_id] = new_data;
        }
    }

    getArtState(){
        return State.artworks;
    }

    hasArtID(new_id){
        return State.artworks.hasOwnProperty(new_id);
    }

    removeArtID(new_id){
        delete State.artworks[new_id];
    }


    addArtist(new_id,new_data) {
        if (State.artists.hasOwnProperty(new_id)) {
        }
        else {
        State.artists[new_id] = new_data;
        }
    }

    getArtistState(){
        return State.artists;
    }

    hasArtistID(new_id){
        return State.artists.hasOwnProperty(new_id);
    }

    removeArtistID(new_id){
        delete State.artworks[new_id];
    }


    addCategory(new_id,new_data) {
        if (State.categories.hasOwnProperty(new_id)) {
        }
        else {
        State.categories[new_id] = new_data;
        }
    }

    getCategoryState(){
        return State.categories;
    }

    hasCategoryID(new_id){
        return State.categories.hasOwnProperty(new_id);
    }

    removeCategoryID(new_id){
        delete State.categories[new_id];
    }

}