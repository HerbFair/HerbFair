import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

const Order = model('Order', OrderSchema);

export default Order;
