const router = require('express').Router();

const ApiProductosMock = require('../api/productos');

const apiProducts = new ApiProductosMock();

module.exports = function() {

    router.post('/productos-test', async (req, res, next) => {
        try {
            res.json(await apiProducts.productosTest(req.query.cant));
        } catch (error) {
            next(error);
        }
    });

    router.get('/', (req, res, next) => {
        try {
            //res.json(productos)
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', (req, res, next) => {
        try {
            //req.params.id
            //res.json(productos)
        } catch (error) {
            next(error);
        }
    });

    router.use((err, req, res, next) => {
        const erroresNoEncontrados = [
            'Error al listar productos'
        ];

        if (erroresNoEncontrados.includes(err.message)) {
            res.status(404)
        } else {
            res.status(500)
        }

        res.json({ message: err.message })
    });
    
    return router;
};