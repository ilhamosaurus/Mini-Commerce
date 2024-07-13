const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const transactionRouter = require('./routes/transaction');
const productRouter = require('./routes/products');
const { swaggerUi, specs } = require('./swagger');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);

module.exports = app;
