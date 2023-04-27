import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import { ProductRepository } from './repository';

const inventory = express.Router();

inventory.get(
  '/health',
  tracedAsyncHandler(function healthCheck(_req, res) {
    return toSuccess({ res, message: 'Server up and running!' });
  }),
);

inventory.get(
  '/',
  tracedAsyncHandler(async function getProducts(_req, res) {
    await ProductRepository.getProducts()
      .then((products) => toSuccess({ res, data: products }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

inventory.post(
  '/',
  tracedAsyncHandler(async function createProduct(req, res) {
    await ProductRepository.createProduct(req.body)
      .then((product) => toSuccess({ res, data: product }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

inventory.get(
  '/:id',
  tracedAsyncHandler(async function getProductById(req, res) {
    await ProductRepository.getProductById(req.params.id)
      .then((product) => toSuccess({ res, data: product }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

inventory.put(
  '/:id',
  tracedAsyncHandler(async function updateProduct(req, res) {
    await ProductRepository.updateProduct(req.params.id, req.body)
      .then((product) => toSuccess({ res, data: product }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

inventory.delete(
  '/:id',
  tracedAsyncHandler(async function deleteProduct(req, res) {
    await ProductRepository.deleteProduct(req.params.id)
      .then((product) => toSuccess({ res, data: product }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

export default inventory;
