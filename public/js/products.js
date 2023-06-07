// const axios = require('axios');

// Fetches all products from backend.
async function handleFetchAllRequest() {
    try {
        // send fetchAll() request to backend
        const response = await axios.get('/api/products');
        const products = response.data;

        // logz
        console.log(products);
    } catch (error) {
        // bad things occured... debug time -.-
        // [... proper handling goes here ]
        console.error(error)
    }
}

// Fetches one singluar product for modifications
async function fetchProductById(id) {
    console.log('Requesting ProductId is -> ' + id);
}

// Here we go now we're cooking...
const fetchAllButton = document.getElementById('fetchAllButton');
fetchAllButton.addEventListener('click', handleFetchAllRequest);

// goodnite
console.log("Hello and goodnite from products.js -.-");