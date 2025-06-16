export function fetchImage(id = '2d83fb4d-1851-ad82-46c6-1c737976e3fd') {
    // This function returns the art image link hosted by ARTIC 
    const addressURL = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`
    return addressURL
}