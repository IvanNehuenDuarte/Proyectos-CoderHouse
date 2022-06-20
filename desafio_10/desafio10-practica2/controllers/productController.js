const Product = require('../Models/Product');

exports.add = async (req, res, next) => {
    const products = new Product(req.body);

    try {
        await products.save();
        res.json({ message: 'Nuevo producto agregado' })
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    };
};

exports.list = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    };
};

exports.update = async (req, res, next) => {
    try {
        const products = await Product.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json({
            message: 'Producto actualizado'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la petición'
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await Product.findOneAndDelete({ _id: req.params.id })
        res.json({ message: 'Producto eliminado satisfactoriamente' })
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la petición'
        });
    }
};

exports.search = async (req, res, next) => {
    try {
        const product = await Product.find({
            title: new RegExp(req.params.query, 'i'),
        });

        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la petición'
        });
    }
}
