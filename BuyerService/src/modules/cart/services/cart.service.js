import { insertCart, getCartByBuyerId, updateCartByBuyerId, deleteCartByBuyerId } from '../repositories/cart.repository';

export const createCart = async (buyerId, data) => {
  const cart = await getCartByBuyerId(buyerId);

  if (cart) {
    return { status: 400, message: 'Cart already exists!' };
  }

  await insertCart({ ...data, buyerId: buyerId });

  return { status: 200, data: cart };
};

export const retrieveCart = async (buyerId) => {
  const cart = await getCartByBuyerId(buyerId);
  console.log('Cart = ', cart);

  if (!cart) {
    return { status: 404, message: "Cart doesn't exist to update" };
  }
  return { status: 200, data: cart };
};

export const updateCartById = async (buyerId, data) => {
  const cart = await getCartByBuyerId();

  if (!cart) return { status: 404, message: "Cart doesn't exist to update" };

  await updateCartByBuyerId(buyerId, data);

  return { status: 200, data: cart };
};

export const deleteCart = async (buyerId) => {
  const cart = await getCartByBuyerId();

  if (!cart) return { status: 404, message: "Cart doesn't exist to remove" };

  return deleteCartByBuyerId(buyerId);
};
