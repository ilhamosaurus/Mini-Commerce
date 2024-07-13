const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const { getProducts } = require('./handler/product');
const transactionRouter = require('./routes/transaction');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/product', getProducts);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);

module.exports = app;
