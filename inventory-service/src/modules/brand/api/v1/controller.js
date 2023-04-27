import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import { BrandRepository } from './repository';

const brand = express.Router();

brand.get(
  '/health',
  tracedAsyncHandler(function healthCheck(_req, res) {
    return toSuccess({ res, message: 'Server up and running!' });
  }),
);

brand.get(
  '/',
  tracedAsyncHandler(async function getBrands(_req, res) {
    await BrandRepository.getBrands()
      .then((brands) => toSuccess({ res, data: brands }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

brand.post(
  '/',
  tracedAsyncHandler(async function createBrand(req, res) {
    await BrandRepository.createBrand(req.body)
      .then((brand) => toSuccess({ res, data: brand }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

brand.get(
  '/:id',
  tracedAsyncHandler(async function getBrandById(req, res) {
    await BrandRepository.getBrandById(req.params.id)
      .then((brand) => toSuccess({ res, data: brand }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

brand.put(
  '/:id',
  tracedAsyncHandler(async function updateBrand(req, res) {
    await BrandRepository.updateBrand(req.params.id, req.body)
      .then((brand) => toSuccess({ res, data: brand }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

brand.delete(
  '/:id',
  tracedAsyncHandler(async function deleteBrand(req, res) {
    await BrandRepository.deleteBrand(req.params.id)
      .then((brand) => toSuccess({ res, data: brand }))
      .catch((err) => toError({ res, message: err.message }));
  }),
);

export default brand;
