import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CartItemSchema = new mongoose.Schema({
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
});

CartItemSchema.plugin(mongoosePaginate);

CartItemSchema.index({ createdAt: 1 });

const CartItem = mongoose.model('CartItem', CartItemSchema);

CartItem.syncIndexes();

export default CartItem;
