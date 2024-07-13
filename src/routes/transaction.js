const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { topup, getHistory, payment } = require('../handler/transaction');
const {
  topupValidator,
  paymentValidator,
} = require('../validator/transaction');
const transactionRouter = express.Router();

transactionRouter.post('/topup', verifyToken, topupValidator, topup);
transactionRouter.get('/history', verifyToken, getHistory);
transactionRouter.post('/payment', verifyToken, paymentValidator, payment);

module.exports = transactionRouter;
