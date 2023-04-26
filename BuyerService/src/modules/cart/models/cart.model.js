import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CartSchema = new mongoose.Schema(
  {
    cartItemId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
    cartId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

CartSchema.plugin(mongoosePaginate);

CartSchema.index({ createdAt: 1 });

const Cart = mongoose.model('Question', CartSchema);

Cart.syncIndexes();

export default Cart;
