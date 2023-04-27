import Order from '../models/Order.model';

const createOrder = async (order) => {
  try {
    const data = await Order.create(order);
    await data.save();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getOrders = async () => {
  try {
    const data = await Order.find();
    if (!data) throw new Error('No Orders found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getOrderById = async (id) => {
  try {
    const data = await Order.findById(id);
    if (!data) throw new Error('No Order found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getOrderByBuyerId = async (id) => {
  try {
    const data = await Order.find({ buyer: id });
    if (!data) throw new Error('No Order found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getOrderByProductId = async (id) => {
  try {
    const data = await Order.find({ product: id });
    if (!data) throw new Error('No Order found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateOrder = async (id, order) => {
  try {
    const data = await Order.findByIdAndUpdate(id, order, { new: true });
    if (!data) throw new Error('No Order found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateOrderStatus = async (id, status) => {
  try {
    const data = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!data) throw new Error('No Order found');
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const OrderRepository = {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByBuyerId,
  getOrderByProductId,
  updateOrder,
  updateOrderStatus,
};

export default OrderRepository;
