export async function searchCategoryArts(category_title, page=1, limit=50) {
    // // This function tries to load art in a certain category
    const addressURL = `https://api.artic.edu/api/v1/artworks/search?from=${limit*(page-1)}&size=${limit}&q=${category_title}`
    // const addressURL = `https://api.artic.edu/api/v1/artworks/search?from=${limit*(page-1)}&size=${limit}&query[match][category_titles]=${category_title}`

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