export async function fetchArt(id, all_fields = false) {
    // This function returns the json data from the api related to the art with id = {id}

    // if only a small selection of data is needed we can request them by setting all_fields = false
    const address_parameters = all_fields ? '' : '?fields=id,title,artist_titles,artist_ids,date_display,short_description,description,exhibition_history,thumbnail,color,category_titles,category_ids,image_id'
    
    // Address from the Artic API
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}${address_parameters}`
    const returnResponse = await fetch(addressURL, 
        { headers: {
            'AIC-User-Agent': 'Articasso.org' // Documentation Requires custom AIC-User-Agent
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