const express = require('express');
const router = express.Router();

// Fetch all products
router.get('/', async (req, res) => {
    var pool = req.app.get('pool');
    // try catch request flow
    try { 
        const query = 'SELECT * FROM products';
        const result = await pool.query(query);
        const products = result.rows;

        res.render('products', { products: products });
    } catch (error) {
        // error encountered on backend
        console.error('Failed to fetch products: ', error);
        res.status(500).send();
    }
});

// Fetch a single product
router.get('/:id', async (req, res) => { 
    var pool = req.app.get('pool');
    const productId = req.params.id;
    // try catch request flow
    try {
        const query = ('SELECT * FROM products WHERE id = ?', [productId]);
        const result = await pool.query(query);
        const product = result.row;
    } catch (error) {
        // error encountered on backend
        console.error('Failed to fetch poduct by Id: ' + productId)
    }

    const query = 'SELECT * FROM products WHERE id = ?'
    const product = {
        id: 1,
        title: 'GTX 980 Ti',
        descr: 'absolute unit of a card. in box. never used, only for mining crypto.',
        price: 150.00,
    }
    console.log('DB.GET_PRODUCT(' + productId + ')');
    res.render('products', { myproduct: product});
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
