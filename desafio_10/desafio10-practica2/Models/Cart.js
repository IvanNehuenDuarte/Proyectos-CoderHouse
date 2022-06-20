const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
    // created: {
    //     type: Date,
    //     default: Date.now,
    // },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        unitPrice: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        amount: {
            type: Number,
        }
    }],
    totalAmount: {
        type: Number,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);