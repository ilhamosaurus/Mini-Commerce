const express = require('express');
const { registerValidator, loginValidator } = require('../validator/auth');
const { register, login } = require('../handler/auth');
const authRouter = express.Router();

authRouter.post('/register', registerValidator, register);
authRouter.post('/login', loginValidator, login);

module.exports = authRouter;
