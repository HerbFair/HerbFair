import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CartSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer',
  },
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CartItem',
  },
});

CartSchema.plugin(mongoosePaginate);

CartSchema.index({ createdAt: 1 });

const Cart = mongoose.model('Cart', CartSchema);

Cart.syncIndexes();

export default Cart;
