const Delivery = require("../models/delivery");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Fetch All Delivery Details =>   /api/v1/admin/delivery-list/

exports.deliveryList = catchAsyncErrors(async (res) => {
  const delivery = await Delivery.find();

  res.status(200).json({
    success: true
  });
});

// Update a Delivery =>   /api/v1/admin/delivery-list/:id

exports.updateDeliveryStatus = catchAsyncErrors(async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);

  delivery.orderStatus = req.body.status,
  delivery.deliveryTime = Date.now();

  await delivery.save();

  res.status(200).json({
    success: true,
    message:"Successfully Updated The Delivery Status"
  });
});
