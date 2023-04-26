import { insertCart, getCartByBuyerId, updateCartByBuyerId, deleteCartByBuyerId} from '../repositories/cart.repository';

export const createCart = async (userId, data) => {
  return insertCart({ ...data, buyerId: userId })
};

export const retrieveCart = async (userId) => {
  let cart = await getCartByBuyerId(userId);

  if (!cart) {
    return { status: 400, message: "Cart doesn't exist to update" };
  }
}

export const updateCartById = async (cart_id, data, user) => {
  let cart = await findCart({ _id: cart_id })
  if (!cart) return { status: 400, message: "Cart doesn't exist to update" }
  if (data.name) {
    const check = await findCart({ name: data.name })
    if (check && check._id?.toString() !== cart_id?.toString()) return { status: 400, message: 'Cart name already taken' }
  }
  if (cart.creator_lock && cart.creator.toString() !== user._id.toString()) return { status: 403, message: 'You are not authorized to update this cart' }
  if (data.max_score) {
    const r = await getSubmissions({ filter: { cart: cart_id } }).then((res) => {
      return res
    })
    if (r.totalDocs > 0) return { status: 400, message: 'Cannot update cart with submissions' }
  }

  return await findAndUpdateCart({ _id: cart_id }, data)
}

export const deleteCart = async (cart_id, user) => {
  const cart = await findCart({ _id: cart_id })
  const checkSubmission = await getOneSubmission({ cart: cart_id })

  if (cart.enabled) {
    return { status: 400, message: 'Failed to delete cart/ Cart is active' }
  }

  if (checkSubmission) {
    return { status: 400, message: 'Failed to delete cart/ Cart already has a submission' }
  }

  if (!cart) return { status: 400, message: "Cart doesn't exist to remove" }
  if (cart.creator_lock && cart.creator.toString() !== user._id.toString()) return { status: 403, message: 'You are not authorized to delete this cart' }
  return await deleteACart({ _id: cart_id })
}