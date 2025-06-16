export async function searchArts(search_term, page=1, limit=50) {
    // // This function tries to search for all art with search_term in their metadata
    const addressURL = `https://api.artic.edu/api/v1/artworks/search?limit=${limit}&page=${page}&q=${search_term}`
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