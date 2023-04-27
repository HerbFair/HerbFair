import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import ReviewRepository from './repositary/review.repositary';
const system = express.Router();

system.get(
  '/review',
  tracedAsyncHandler(function healthCheck(_req, res) {
    return toSuccess({ res, message: 'Server up and running!' });
  }),
);

system.get(
  '/',
  tracedAsyncHandler(async function getAllReviews(req, res) {
    await ReviewRepository.getAllReviews()
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

system.get(
  '/:id',
  tracedAsyncHandler(async function getReviewById(req, res) {
    await ReviewRepository.getReviewById(req.params.id)
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

system.post(
  '/',
  tracedAsyncHandler(async function createReview(req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const review = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      message: req.body.message,
      rating: req.body.rating,
      photo: req.body.photo,
    };

    await ReviewRepository.createSeller(review)
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

system.put(
  '/:id',
  tracedAsyncHandler(async function updateReview(req, res) {
    await ReviewRepository.updateSeller(req.params.id, req.body)
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

system.delete(
  '/:id',
  tracedAsyncHandler(async function deleteReview(req, res) {
    await ReviewRepository.deleteReview(req.params.id)
      .then(() => {
        return toSuccess({ res, message: 'Review deleted successfully' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

export default system;
