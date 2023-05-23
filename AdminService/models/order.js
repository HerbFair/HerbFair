const mongoose = require('mongoose')

//Please note that this is not the completed order schema, this is draft one which used to test my functionalities
const orderSchema = mongoose.Schema({
    productList: [
        {
            product:  {
                id: {
                    type: String
                },
                status: {
                    type: String
                }
            }
        }
    ],
    paymentDetails: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: Number,
        required: true,
        default: 0
    },
    deliveryTime: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Order', orderSchema)