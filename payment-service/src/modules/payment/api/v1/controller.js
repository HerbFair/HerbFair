import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY);
const payment = express.Router();

payment.post('/', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    },
  );
});

export default payment;
