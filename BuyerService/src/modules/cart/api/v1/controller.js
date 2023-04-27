import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import { createCart, retrieveCart, updateCartById, deleteCart } from '../../services/cart.service';

const cart = express.Router();

cart.get(
  '/:id',
  tracedAsyncHandler(function getCart(req, res) {
    const serviceResponse = retrieveCart(req.params.id);

    if (200 != serviceResponse.status) {
      return toError(res, serviceResponse.status, serviceResponse.message);
    }

    res.body.data.cart = serviceResponse.data;
    return toSuccess({ res });
  }),
);

cart.post(
  '/:id',
  tracedAsyncHandler(function addCart(req, res) {
    const buyerId = req.params.id;
    const cartData = req.body.data;

    const serviceResponse = createCart(buyerId, cartData);

    if (200 != serviceResponse.status) {
      return toError(res, serviceResponse.status, serviceResponse.message);
    }

    res.body.data.cart = serviceResponse.data;
    return toSuccess({ res });
  }),
);

cart.put(
  '/:id',
  tracedAsyncHandler(function addCart(req, res) {
    const buyerId = req.params.id;
    const cartData = req.body.data;

    const serviceResponse = updateCartById(buyerId, cartData);

    if (200 != serviceResponse.status) {
      return toError(res, serviceResponse.status, serviceResponse.message);
    }

    res.body.data.cart = serviceResponse.data;
    return toSuccess({ res });
  }),
);

cart.delete(
  '/:id',
  tracedAsyncHandler(function addCart(req, res) {
    const buyerId = req.params.id;

    const serviceResponse = deleteCart(buyerId);

    if (200 != serviceResponse.status) {
      return toError(res, serviceResponse.status, serviceResponse.message);
    }

    return toSuccess({ res });
  }),
);
export default cart;
