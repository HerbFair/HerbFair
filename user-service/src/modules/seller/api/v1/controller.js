import express from 'express';
import generator from 'generate-password';
import sha256 from 'crypto-js/sha256';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import SellerEmailService from '../../../../email/seller.emails';
import SellerService from './service/seller.service';

const generatePassword = () => {
  return generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
    excludeSimilarCharacters: true,
  });
};

const seller = express.Router();

seller.post(
  '/',
  tracedAsyncHandler(async function createSeller(req, res) {
    let password = '';
    if (!req.body.password) {
      password = sha256(generatePassword()).toString();
      req.body.password = password;
    }
    await SellerService.createSeller(req.body)
      .then(async (data) => {
        if (!req.body.password) {
          await SellerEmailService.sendGeneratedPassord(data, password);
        }
        return toSuccess({ res, status: 201, data, message: 'Success' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

seller.get(
  '/',
  tracedAsyncHandler(async function getAllSellers(req, res) {
    await SellerService.getAllSellers(req.query)
      .then((data) => {
        return toSuccess({ res, status: 200, data, message: 'Success' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

seller.get(
  '/:id',
  tracedAsyncHandler(async function getSellerById(req, res) {
    await SellerService.getSellerById(req.params.id)
      .then((data) => {
        return toSuccess({ res, status: 200, data, message: 'Success' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

seller.put(
  '/:id',
  tracedAsyncHandler(async function updateSeller(req, res) {
    await SellerService.updateSeller(req.params.id, req.body)
      .then((data) => {
        return toSuccess({ res, status: 200, data, message: 'Success' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

seller.delete(
  '/:id',
  tracedAsyncHandler(async function deleteSeller(req, res) {
    await SellerService.deleteSeller(req.params.id)
      .then((data) => {
        return toSuccess({ res, status: 200, data, message: 'Success' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

seller.post(
  '/login',
  tracedAsyncHandler(async function login(req, res) {
    await SellerService.sellerLogin(req.body.email, req.body.password)
      .then((data) => {
        return toSuccess({ res, status: 200, data, message: 'Success' });
      })
      .catch((err) => {
        return toError({ res, status: 401, message: err.message });
      });
  }),
);

seller.post(
  '/refresh-token',
  tracedAsyncHandler(async function refreshToken(req, res) {
    await SellerService.refreshToken(req.body)
      .then((data) => {
        return toSuccess({ res, status: 200, data, message: 'Success' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

seller.get(
  '/:id/verification/status',
  tracedAsyncHandler(async function getTotpStatusById(req, res) {
    await SellerService.getTotpStatusById(req.params.id)
      .then((data) => {
        return toSuccess({ res, status: 200, data, message: 'Success' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

seller.post(
  '/:id/verification',
  tracedAsyncHandler(async function verifyTOTPbyId(req, res) {
    await SellerService.verifyTOTPbyId(req.params.id, req.body.token)
      .then((data) => {
        return toSuccess({ res, status: 200, data, message: 'Success' });
      })
      .catch((error) => {
        return toError({ res, message: error.message });
      });
  }),
);

seller.post(
  '/:id/verification/choose-method',
  tracedAsyncHandler(async function chooseTOTPMethod(req, res) {
    await SellerService.chooseTOTPMethod(req.params.id, req.body.method)
      .then((data) => {
        return toSuccess({ res, status: 200, data, message: 'Success' });
      })
      .catch((error) => {
        return toError({ res, message: error.message });
      });
  }),
);

export default seller;
