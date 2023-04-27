import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import { CategoryRepository } from './repository';

const category = express.Router();

category.get(
  '/health',
  tracedAsyncHandler(function healthCheck(_req, res) {
    return toSuccess({ res, message: 'Server up and running!' });
  }),
);

category.get(
  '/',
  tracedAsyncHandler(async function getCategories(_req, res) {
    await CategoryRepository.getCategories()
      .then((categories) => toSuccess({ res, data: categories }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

category.post(
  '/',
  tracedAsyncHandler(async function createCategory(req, res) {
    await CategoryRepository.createCategory(req.body)
      .then((category) => toSuccess({ res, data: category }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

category.get(
  '/:id',
  tracedAsyncHandler(async function getCategoryById(req, res) {
    await CategoryRepository.getCategoryById(req.params.id)
      .then((category) => toSuccess({ res, data: category }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

category.put(
  '/:id',
  tracedAsyncHandler(async function updateCategory(req, res) {
    await CategoryRepository.updateCategory(req.params.id, req.body)
      .then((category) => toSuccess({ res, data: category }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

category.delete(
  '/:id',
  tracedAsyncHandler(async function deleteCategory(req, res) {
    await CategoryRepository.deleteCategory(req.params.id)
      .then((category) => toSuccess({ res, data: category }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

export default category;
