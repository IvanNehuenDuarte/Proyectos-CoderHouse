const Cart = require('../Models/Cart');
const Product = require('../Models/Product');
// const Products = require('../Models/Products');

exports.add = async (req, res, next) => {
    try {
        const cart = await new Cart(req.body);
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la petición'
        });
    };
};

exports.list = async (req, res, next) => {
    try {
        const cart = await Cart.find({})
        .populate("products.product");
        // console.log(cart);
        res.json(cart);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la petición'
        });
    };
};

// exports.update = async (req, res, next) => {
//     try {
//         const cart = await Cart.findByIdAndUpdate(
//             { _id: req.params.id },
//             req.body,
//             { new: true },
//         )
//         .populate('products.product');

//         res.json(cart);
//     } catch (error) {
//         res.status(400).json({
//             message: 'Error al procesar la petición'
//         });
//     }
// };

exports.delete = async (req, res, next) => {
    try {
        await Cart.findByIdAndRemove({ _id: req.params.id });

        res.json({ message: 'El producto fue eliminado satisfctoriamente' });
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la petición'
        });
    }
};