const { check } = require('express-validator');

const topupValidator = [
  check('amount', 'Amount must be greater than 0')
    .isFloat({ gt: 0 })
    .notEmpty({ ignore_whitespace: true }),
];

const paymentValidator = [
  check('kode_produk', 'Product code is required')
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .toUpperCase()
    .trim(),
  check('qty', 'Quantity must be greater than 0')
    .notEmpty({ ignore_whitespace: true })
    .isInt({ gt: 0 }),
];

module.exports = { topupValidator, paymentValidator };
