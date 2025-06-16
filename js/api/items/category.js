export async function fetchCategory( category_id ) {
    // This function returns the category data json object from the api
    const addressURL = `https://api.artic.edu/api/v1/category-terms/${category_id}`
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