export async function find_art(id = 129884, all_fields = true) {
    // This function returns the json data from the api related to the art with id = {id}

    // if only a small selection of data is needed we can request them by setting all_fields = false
    const address_parameters = all_fields ? '' : '?fields=id,title,artist_titles,artist_ids,date_display,short_description,description,exhibition_history,thumbnail,color,category_titles,category_ids,image_id'
    
    // Address from the Artic API
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}${address_parameters}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'artic-arts.amirdaniali.com' // Documentation Requires custom AIC-User-Agent
        }})    
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })

        // console.log('art with id', id,'was found', returnResponse);

        return returnResponse
}

export async function find_manifest(id = 129884) {
    // This function returns the art manifest json object
    // The manifest often includes some other useful data not retured by the other route. It often has better descriptions too.
    
    // Address from the Artic API
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}/manifest.json`
        
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'artic-arts.amirdaniali.com' // Documentation Requires custom AIC-User-Agent
        }})    
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })

        // console.log('art with id', id,'was found', returnResponse);
        // console.log(returnResponse);
        return returnResponse
}



export async function find_art_field(id = 129884, field = none) {
    // This function returns the value from a single field of an artwork data
    const address_parameters = field ? `?fields=${field}` : ``;
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}${address_parameters}`
    const returnResponse = await fetch(addressURL,{ headers: {
        'AIC-User-Agent': 'artic-arts.amirdaniali.com' // Documentation Requires custom AIC-User-Agent
    }});
    
    const data = await returnResponse.json();
    return data
}


export async function find_art_image(id = '2d83fb4d-1851-ad82-46c6-1c737976e3fd') {
    // This function returns the art image link hosted by ARTIC 
    const addressURL = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`
    return addressURL
}


export async function find_recent_artworks(limit) {
    // This function returns the first {limit} number of arts from the api
    const addressURL = `https://api.artic.edu/api/v1/artworks?limit=${limit}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'artic-arts.amirdaniali.com' // Documentation Requires custom AIC-User-Agent
        }})    
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })

        return returnResponse
}


export async function find_category( category_id, limit = 15) {
    // This function returns the category data json object from the api
    const addressURL = `https://api.artic.edu/api/v1/category-terms/${category_id}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'artic-arts.amirdaniali.com' // Documentation Requires custom AIC-User-Agent
        }})    
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })

        return returnResponse
}


export async function find_artist(artist_id) {
    // This function returns the artits data json object
    const addressURL = `https://api.artic.edu/api/v1/agents/${artist_id}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'artic-arts.amirdaniali.com' // Documentation Requires custom AIC-User-Agent
        }})    
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })



        return returnResponse
}

export async function find_artist_arts(artist_title) {
    // // This function tries to search for all art made by a certain artist
    const addressURL = `https://api.artic.edu/api/v1/artworks/search?q=${artist_title}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'artic-arts.amirdaniali.com' // Documentation Requires custom AIC-User-Agent
        }})    
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })
        return returnResponse
}
