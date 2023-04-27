import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import SellerRepository from './repositary/seller.repositary';

const system = express.Router();

system.get(
  '/health',
  tracedAsyncHandler(function healthCheck(_req, res) {
    return toSuccess({ res, message: 'Server up and running!' });
  }),
);

system.get(
  '/',
  tracedAsyncHandler(async function getAllSellers(req, res) {
    await SellerRepository.getAllSellers()
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
  tracedAsyncHandler(async function getSellerById(req, res) {
    await SellerRepository.getSellerById(req.params.id)
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
  tracedAsyncHandler(async function createSeller(req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const seller = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      stateOrProvince: req.body.stateOrProvince,
      postalCode: req.body.postalCode,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
    };

    await SellerRepository.createSeller(seller)
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
  tracedAsyncHandler(async function updateSeller(req, res) {
    await SellerRepository.updateSeller(req.params.id, req.body)
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
  tracedAsyncHandler(async function deleteSeller(req, res) {
    await SellerRepository.deleteSeller(req.params.id)
      .then(() => {
        return toSuccess({ res, message: 'Seller deleted successfully' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

system.post(
  '/login',
  tracedAsyncHandler(async function loginSeller(req, res) {
    await SellerRepository.getSellerByEmail(req.body.email)
      .then(async (data) => {
        if (!data) {
          return toError({ res, message: 'Invalid email or password' });
        }
        const validPassword = await bcrypt.compare(req.body.password, data.password);
        if (!validPassword) {
          return toError({ res, message: 'Invalid email or password' });
        }
        const acessToken = jwt.sign(
          {
            id: data._id,
            email: data.email,
            role: 'seller',
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '30m',
          },
        );
        const refreshToken = jwt.sign(
          {
            id: data._id,
            email: data.email,
            role: 'seller',
          },
          process.env.REFRESH_TOKEN_SECRET,
        );

        const response = {
          accessToken: acessToken,
          refreshToken: refreshToken,
        };
        return toSuccess({ res, data: response });
      })
      .catch(() => {
        return toError({ res, message: 'Invalid email or password' });
      });
  }),
);

system.post(
  '/refresh',
  tracedAsyncHandler(function refreshToken(req, res) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return toError({ res, message: 'Refresh token is required' });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, seller) => {
      if (err) {
        return toError({ res, message: 'Invalid refresh token' });
      }
      const acessToken = jwt.sign(
        {
          id: seller.id,
          email: seller.email,
          role: 'seller',
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1d',
        },
      );
      const response = {
        accessToken: acessToken,
      };
      return toSuccess({ res, data: response });
    });
  }),
);

export default system;
