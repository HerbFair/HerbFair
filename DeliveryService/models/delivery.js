const mongoose = require('mongoose')

//Please note that this is not the completed order schema, this is draft one which used to test my functionalities
const deliverySchema = mongoose.Schema({
    
    orderId: {
        type: Number,
        required: true,
    },
    paymentDetails: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    deliveryStatus: {
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

module.exports = mongoose.model('Delivery', deliverySchema)