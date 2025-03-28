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

export async function find_art_field(id = 129884, field = none) {
    const address_parameters = field ? `?fields=${field}` : ``;
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}${address_parameters}`
    const returnResponse = await fetch(addressURL,{ headers: {
        'AIC-User-Agent': 'Code the Dream Prework @amirdaniali@gh'
    }});
    
    const data = await returnResponse.json();
    console.log('art with id', id,'was found', data);

    return data
}


export async function find_art_image(id = 'e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9') {
    
    const addressURL = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`

    
    // const data = await returnResponse.json();
    // console.log('image with id', id,'was found', addressURL);

    return addressURL
}