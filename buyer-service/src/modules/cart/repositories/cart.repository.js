import Cart from '../models/cart.model';

export const insertCart = async (data) => {
  return new Cart(data).save();
};

export const getCartByBuyerId = async (buyerId) => {
  return Cart.find({ buyerId: buyerId }).exec();
};

export const updateCartByBuyerId = async (id, data) => {
  return Cart.findOneAndUpdate({ buyerId: id }, data, { new: true });
};

export const deleteCartByBuyerId = async (buyerId) => {
  const cart = Cart.find({ buyerId: buyerId }).exec();
  return cart.deleteOne();
};
