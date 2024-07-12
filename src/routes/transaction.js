const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { topup } = require('../handler/transaction');
const transactionRouter = express.Router();

transactionRouter.post('/topup', verifyToken, topup);

module.exports = transactionRouter;
