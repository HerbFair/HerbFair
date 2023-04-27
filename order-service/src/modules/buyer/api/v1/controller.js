import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import OrderRepository from './repository/order.repository';

const buyer = express.Router();

buyer.get(
  '/health',
  tracedAsyncHandler(function healthCheck(_req, res) {
    return toSuccess({ res, message: 'Server up and running!' });
  }),
);

buyer.get(
  '/',
  tracedAsyncHandler(async function getOrders(req, res) {
    await OrderRepository.getOrders()
      .then((data) => toSuccess({ res, data }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

buyer.get(
  '/:id',
  tracedAsyncHandler(async function getOrderById(req, res) {
    await OrderRepository.getOrderById(req.params.id)
      .then((data) => toSuccess({ res, data }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

buyer.get(
  '/buyer/:id',
  tracedAsyncHandler(async function getOrderByBuyerId(req, res) {
    await OrderRepository.getOrderByBuyerId(req.params.id)
      .then((data) => toSuccess({ res, data }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

buyer.get(
  '/product/:id',
  tracedAsyncHandler(async function getOrderByProductId(req, res) {
    await OrderRepository.getOrderByProductId(req.params.id)
      .then((data) => toSuccess({ res, data }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

buyer.post(
  '/',
  tracedAsyncHandler(async function createOrder(req, res) {
    await OrderRepository.createOrder(req.body)
      .then((data) => toSuccess({ res, data }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

buyer.put(
  '/:id',
  tracedAsyncHandler(async function updateOrder(req, res) {
    await OrderRepository.updateOrder(req.params.id, req.body)
      .then((data) => toSuccess({ res, data }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

buyer.put(
  '/:id/status',
  tracedAsyncHandler(async function updateOrderStatus(req, res) {
    await OrderRepository.updateOrderStatus(req.params.id, req.body.status)
      .then((data) => toSuccess({ res, data }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

export default buyer;
