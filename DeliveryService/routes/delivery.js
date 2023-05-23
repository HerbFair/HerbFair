const express = require('express');
const router = express.Router();

const {
    deliveryList,
    updateDeliveryStatus
} = require('../controller/delivery');

router.route('/admin/updateDeliveryStatus').put(updateDeliveryStatus);
router.route('/admin/deliveryList').get(deliveryList);

module.exports = router;