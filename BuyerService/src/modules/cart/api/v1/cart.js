import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess } from '../../../../utils';

const cart = express.Router();

cart.get(
  '/items',
  tracedAsyncHandler(function getItems(_req, res) {
    return toSuccess({ res, message: 'Server up and running!' });
  }),
);

export default cart;
