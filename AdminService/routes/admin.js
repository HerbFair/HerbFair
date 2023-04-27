const express = require('express');
const router = express.Router();

const {
    OrderList,
    updateOrder,

} = require('../controller/admin');

router.route('/admin/updateOrder').put( updateOrder);
router.route('/orders').get(OrderList);

module.exports = router;