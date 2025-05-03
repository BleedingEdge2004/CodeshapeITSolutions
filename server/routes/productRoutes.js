const express = require('express');
const router = express.Router();
// This code imports the express module and creates a new router instance for handling product and category-related requests in an Express.js application.
const {
    createCategory,
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
// This code imports the necessary modules and sets up the router for handling product and category-related requests in an Express.js application. It defines routes for creating, retrieving, updating, and deleting products and categories, associating each route with a specific controller function that handles the request logic.
router.post('/category', createCategory);
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
// This code defines the routes for handling product and category-related requests in an Express.js application. It imports the necessary modules, sets up the router, and defines routes for creating, retrieving, updating, and deleting products and categories. Each route is associated with a specific controller function that handles the request logic.