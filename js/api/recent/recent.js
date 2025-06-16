export async function fetchRecentArts(limit, page=1) {
    // This function returns the first {limit} number of arts from the api
    const addressURL = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`
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