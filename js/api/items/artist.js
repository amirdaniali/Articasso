export async function fetchArtist(artist_id) {
    // This function returns the artits data json object
    const addressURL = `https://api.artic.edu/api/v1/agents/${artist_id}`
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



        return returnResponse
}