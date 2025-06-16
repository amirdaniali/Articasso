export async function fetchManifest(id) {
    // This function returns the art manifest json object
    // The manifest often includes some other useful data not retured by the other route. It often has better descriptions too.
    
    // Address from the Artic API
    const addressURL = `https://api.artic.edu/api/v1/artworks/${id}/manifest.json`
        
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
        // console.log(returnResponse);
        return returnResponse
}