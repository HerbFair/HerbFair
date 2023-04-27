import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess, toError } from '../../../../utils';
import AdminRepository from './repository/admin.repository';

const admin = express.Router();

admin.get(
  '/health',
  tracedAsyncHandler(function healthCheck(_req, res) {
    return toSuccess({ res, message: 'Server up and running!' });
  }),
);

admin.get(
  '/',
  tracedAsyncHandler(async function getAllAdmins(req, res) {
    await AdminRepository.getAllAdmins()
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

admin.get(
  '/:id',
  tracedAsyncHandler(async function getAdminById(req, res) {
    await AdminRepository.getAdminById(req.params.id)
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

admin.post(
  '/',
  tracedAsyncHandler(async function createAdmin(req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const admin = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
    };

    await AdminRepository.createAdmin(admin)
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

admin.put(
  '/:id',
  tracedAsyncHandler(async function updateAdmin(req, res) {
    await AdminRepository.updateAdmin(req.params.id, req.body)
      .then((data) => {
        return toSuccess({ res, data });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

admin.delete(
  '/:id',
  tracedAsyncHandler(async function deleteAdmin(req, res) {
    await AdminRepository.deleteAdmin(req.params.id)
      .then(() => {
        return toSuccess({ res, message: 'Admin deleted successfully' });
      })
      .catch((err) => {
        return toError({ res, message: err.message });
      });
  }),
);

admin.post(
  '/login',
  tracedAsyncHandler(async function loginAdmin(req, res) {
    await AdminRepository.getAdminByEmail(req.body.email)
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
            role: 'admin',
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
            role: 'admin',
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

admin.post(
  '/refresh',
  tracedAsyncHandler(function refreshToken(req, res) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return toError({ res, message: 'Refresh token is required' });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
      if (err) {
        return toError({ res, message: 'Invalid refresh token' });
      }
      const acessToken = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          role: 'admin',
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

export default admin;
