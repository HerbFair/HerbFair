import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import BuyerRepository from './repository/buyer.repository';

const buyer = express.Router();

buyer.get(
  '/health',
  tracedAsyncHandler(function healthCheck(_req, res) {
    return toSuccess({ res, message: 'Server up and running!' });
  }),
);

buyer.get(
  '/',
  tracedAsyncHandler(async function getAllBuyers(req, res) {
    await BuyerRepository.getAllBuyers()
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

buyer.get(
  '/:id',
  tracedAsyncHandler(async function getBuyerById(req, res) {
    await BuyerRepository.getBuyerById(req.params.id)
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

buyer.post(
  '/',
  tracedAsyncHandler(async function createBuyer(req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const buyer = {
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

    await BuyerRepository.createBuyer(buyer)
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

buyer.put(
  '/:id',
  tracedAsyncHandler(async function updateBuyer(req, res) {
    await BuyerRepository.updateBuyer(req.params.id, req.body)
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

buyer.delete(
  '/:id',
  tracedAsyncHandler(async function deleteBuyer(req, res) {
    await BuyerRepository.deleteBuyer(req.params.id)
      .then(() => {
        return toSuccess({ res, message: 'Buyer deleted successfully' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

buyer.post(
  '/login',
  tracedAsyncHandler(async function loginBuyer(req, res) {
    await BuyerRepository.getBuyerByEmail(req.body.email)
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
            role: 'buyer',
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
            role: 'buyer',
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

buyer.post(
  '/refresh',
  tracedAsyncHandler(function refreshToken(req, res) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return toError({ res, message: 'Refresh token is required' });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, buyer) => {
      if (err) {
        return toError({ res, message: 'Invalid refresh token' });
      }
      const acessToken = jwt.sign(
        {
          id: buyer.id,
          email: buyer.email,
          role: 'buyer',
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

export default buyer;
