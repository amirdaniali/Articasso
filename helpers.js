export async function find_art(id = 129884, all_fields = true) {
    // console.log('find art initialized with parameter',id);
    const address_parameters = all_fields ? '' : '?fields=id,title,artist_titles,artist_ids,date_display,short_description,description,exhibition_history,thumbnail,color,category_titles,category_ids,image_id'
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}${address_parameters}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'Code the Dream Prework @amirdaniali@gh'
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
    // console.log('find art initialized with parameter',id);
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}/manifest.json`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'Code the Dream Prework @amirdaniali@gh'
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



export async function find_art_field(id = 129884, field = none) {
    const address_parameters = field ? `?fields=${field}` : ``;
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}${address_parameters}`
    const returnResponse = await fetch(addressURL,{ headers: {
        'AIC-User-Agent': 'Code the Dream Prework @amirdaniali@gh'
    }});
    
    const data = await returnResponse.json();
    // console.log('art with id', id,'was found', data);

    return data
}


export async function find_art_image(id = '2d83fb4d-1851-ad82-46c6-1c737976e3fd') {
    
    const addressURL = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`

    
    // const data = await returnResponse.json();
    // console.log('image with id', id,'was found', addressURL);

    return addressURL
}


export async function find_recent_artworks(limit = 15) {

    const addressURL = `https://api.artic.edu/api/v1/artworks?limit=${limit}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'Code the Dream Prework @amirdaniali@gh'
        }})    
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })

        // console.log(`Succesfully displayed ${limit} number of artic art pages. Initial Home page arts loaded. `, returnResponse);

        return returnResponse
}


export async function find_category(limit = 15, category_id = 'PC-1') {

    const addressURL = `https://api.artic.edu/api/v1/category-terms/${category_id}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'Code the Dream Prework @amirdaniali@gh'
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
    // console.log('Artist retrival called');
    const addressURL = `https://api.artic.edu/api/v1/agents/${artist_id}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'Code the Dream Prework @amirdaniali@gh'
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

export async function find_artist_arts(artist_id, artist_title) {
    // console.log('Artist retrival called');
    const addressURL = `https://api.artic.edu/api/v1/artworks/search?q=${artist_title}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'Code the Dream Prework @amirdaniali@gh'
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
