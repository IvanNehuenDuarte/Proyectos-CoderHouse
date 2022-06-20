const router = require('express').Router();

const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

module.exports = function() {

// *PRODUCTOS
    // post: /products
    router.post('/products', productController.add);

    // get: /products
    router.get('/products', productController.list);

    // put: /products/:id
    router.put('/products/:id', productController.update);

    // delete: /products/:id
    router.delete('/products/:id', productController.delete);

    // search: /products/search/:query
    router.get('/products/search/:query', productController.search);

// *CARRITO
    // post: /cart
    router.post('/cart', cartController.add);

    // get: /cart
    router.get('/cart', cartController.list);

    // put: /cart/:id
    // router.put('/cart/:id', cartController.update);

    // delete: /cart/:id
    router.delete('/cart/:id', cartController.delete);

    return router;
};