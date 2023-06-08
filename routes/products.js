const express = require('express');
const router = express.Router();

// turn on for console loggs on the server side
const log = true;

// HOME FOR ROUTE ROOT '/api/products' CRUD operations are supported as specified below...

/* 
    You can post or get at the root directory mentioned above...
    1. /api/products via POST - adds a new product; pass data in req.body; returns operation response in json;
    2. /api/products via  GET - fetches all products; returns json;

    You can modify an existing product if you click on it's edit button...
    3. /api/products/:id via    PUT - modify the specified record given its Id; returns operation response in json.

    You can also make a permanent modification using its delete button lol...
    4. /api/products/:id via DELETE - permenently delete this product from the database; returns operation response in json.
*/

// Create a new product 
router.post('/', async (req, res) => {
    var pool = req.app.get('pool');
    // try catch request flow
    try {
        // get product data from request body
        const { title, price, description } = req.body;

        // add to table
        const query = 'INSERT INTO products (title, price, descr) VALUES ($1, $2, $3)';
        const values = [title, price, description];
        await pool.query(query, values);

        res.status(200).json({message: 'success'}).send();
    } catch (error) {
        // handle error
        console.error("Error adding product: " + error);
        res.status(500).json({error: 'Failed to add product.'}).send();
    }
});

// Fetch all products
router.get('/', async (req, res) => {
    var pool = req.app.get('pool');
    // try catch request flow
    try { 
        const query = 'SELECT * FROM products';
        const result = await pool.query(query);
        const products = result.rows;

        // DEBUG
        if (log) {
            console.log('[LOGGER SAYS]: FETCHED ALL RECORDS.');
        }

        res.status(200)
        res.json(products);
    } catch (error) {
        // handle error
        console.error("Error getting products: " + error);
        res.status(500)
        res.json({error: 'Failed to get products.'});
    }
});

// Fetch a single product
router.get('/:id', async (req, res) => { 
    var pool = req.app.get('pool');
    const productId = req.params.id;
    // try catch request flow
    try {
        const query = 'SELECT * FROM products WHERE id = $1';
        const values = [productId];
        const result = await pool.query(query, values);
        const product = result.rows;

        // DEBUG
        if (log) {
            console.log('[LOGGER SAYS]: FETCHED SINGLE RECORD.');
        }

        res.status(200);
        res.json(product);
    } catch (error) {
        // handle error
        console.error("Error getting product: " + error);
        res.status(500).json({error: 'Failed to get product: ' + productId}).send();
    }

    res.render('products', { myproduct: product});
});

// Delete a product
router.delete('/:id', async (req, res) => {
    var pool = req.app.get('pool');
    const id = req.params.id;

    try {
        const query = 'DELETE FROM products WHERE id = $1';
        const values = [id]
        await pool.query(query, values);

        // DEBUG
        if (log) {
            console.log('[LOGGER SAYS]: DATABASE DELETED A RECORD.');
        }

        res.status(200);
        res.json({message: 'record deleted.'});
    } catch (error) {
        // handle error
        console.error("Error deleting product: " + error);
        res.status(500).json({error: 'Failed to delete product.'});
    }
});

// Update a product
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const productTitle = req.params.title;
    const productsPrice = req.params.price;
    const productsDesc = req.params.desc;

    res.send(`Update product with ID ${productId}`);
});

module.exports = router;
