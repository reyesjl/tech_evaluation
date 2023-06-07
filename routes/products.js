const express = require('express');
const router = express.Router();

// Fetch all products
router.get('/', (req, res) => {
    const products = [
        {id: 1, title: 'fruit', price: '1.50', desc: 'fresh, sweet, vibrant'},
        {id: 2, title: 'vegetables', price: '2.25', desc: 'hearty, crisp, fresh'},
        {id: 3, title: 'sweets', price: '0.75', desc: 'sweet, hard, chocolate'}
    ];

    res.render('products', { products });
});

// Fetch a single product
router.get('/:id', (req, res) => {
    const productId = req.params.id;

    res.send(`Get product with ID ${productId}`);
});

// Create a new product 
router.post('/', (req, res) => {
    const productTitle = req.params.title;
    const productPrice = req.params.price;
    const productDesc = req.params.desc;

    res.send('Create new product.');
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

    res.send(`Delete product with ID ${productId}`);
});

module.exports = router;
