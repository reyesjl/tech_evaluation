// requirements
const express= require('express');
const app = express()
const productsRouter = require('./routes/products');

// setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/products', productsRouter);

// start server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`It lives on localhost:${PORT}`);
});
