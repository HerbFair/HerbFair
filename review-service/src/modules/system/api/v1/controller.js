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


// system.post(
//   '/refresh',
//   tracedAsyncHandler(function refreshToken(req, res) {
//     const refreshToken = req.body.refreshToken;
//     if (!refreshToken) {
//       return toError({ res, message: 'Refresh token is required' });
//     }
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, seller) => {
//       if (err) {
//         return toError({ res, message: 'Invalid refresh token' });
//       }
//       const acessToken = jwt.sign(
//         {
//           id: seller.id,
//           email: seller.email,
//           role: 'seller',
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//           expiresIn: '1d',
//         },
//       );
//       const response = {
//         accessToken: acessToken,
//       };
//       return toSuccess({ res, data: response });
//     });
//   }),
// );

export default system;
