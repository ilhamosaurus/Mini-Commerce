const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { getUserBalance, getUserInfo } = require('../handler/user');
const userRouter = express.Router();

userRouter.get('/info', verifyToken, getUserInfo);
userRouter.get('/balance', verifyToken, getUserBalance);

module.exports = userRouter;
