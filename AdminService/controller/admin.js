const Order = require("../models/order");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// API End Point Fetch All Orders =>   /api/v1/admin/order-list/

exports.OrderList = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Api End Point Update An Orders =>   /api/v1/admin/order-list/:id

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  order.orderStatus = req.body.status,
  order.deliveryTime = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    message:"Successfully UpdateD The Order Status"
  });
});
