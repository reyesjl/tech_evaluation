const express = require('express');
const router = express.Router();

// Fetch all products
router.get('/', (req, res) => {
    res.send('Get all products');
});

// Fetch a single product
router.get('/:id', (req, res) => {
    const productId = req.params.id;
    res.send(`Get product with ID ${productId}`)
});

// Create a new product 
router.post('/', (req, res) => {
    const productTitle = req.params.title;
    const productPrice = req.params.price;
    const productDesc = req.params.desc;

    res.send('Create new product.')
});

// Update a product
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const productTitle = req.params.title;
    const productsPrice = req.params.price;
    const productsDesc = req.params.desc;
    res.send(`Update product with ID ${productId}`);
});

// Delete a product
router.delete(':/id', (req, res) => {
    const productId = req.params.id;
    res.send(`Delete product with ID ${productId}`)
});

module.exports = router;
