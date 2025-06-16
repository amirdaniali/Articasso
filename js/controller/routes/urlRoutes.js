// These routes are the pagess the application will be able to redirect to. Otherwise 404 will kick in. 
// The title and description fields will be updated with javascript for all SPA routes.

export const URLroutes = {
    '404': {
        template: "/static/index.html",
        title: "Articasso",
        description: "Welcome to Articasso where you can view millions of artworks made by over 16000 artists.",
    },
    "": {
        template: "/static/index.html",
        title: "Articasso",
        description: "Welcome to Articasso where you can view millions of artworks made by over 16000 artists.",
    },
    'about': {
        template: "/static/about.html",
        title: "Articasso: About",
        description: "This is the about page.",
    },
    'art': {
        template: "/static/art.html",
        title: "Articasso: View Art",
        description: "This is the art page.",
    },
    'feed': {
        template: "/static/feed.html",
        title: "Articasso: Latest Artworks",
        description: "Enjoy These latest additions to the Artic Database.",
    },
    'countries': {
        template: "/static/countries.html",
        title: "Articasso: Arts of Countries",
        description: "Enjoy art based on country of origin.",
    },
    'odyssey': {
        template: "/static/odyssey.html",
        title: "Articasso: Art Odyssey",
        description: "Art Odyssey is a huge collection of the very top historic artworks everyone should experience at least once.",
    },
    'art_search': {
        template: "/static/art_search.html",
        title: "Articasso: Search Art",
        description: "This is the search page for any artwork you can think of.",
    },
    'artist': {
        template: "/static/artist.html",
        title: "Articasso: View Artist",
        description: "This is the artist lookup page.",
    },
    'artist_search': {
        template: "/static/artist_search.html",
        title: "Articasso: Search Artists",
        description: "This is the search page for any artist you can think of.",
    },
    'category': {
        template: "/static/category.html",
        title: "Articasso: Art Category",
        description: "This is the category page.",
    },
    'category_search': {
        template: "/static/category_search.html",
        title: "Articasso: Search Categories",
        description: "This is the page to search all categories.",
    }
};