const { check } = require('express-validator');

const createProductValidator = [
  check('code', 'Product code is required')
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .toUpperCase()
    .trim(),
  check('name', 'Product name must be at least 3 characters')
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ min: 3 }),
  check('price', 'Product price must be greater than 0')
    .notEmpty({ ignore_whitespace: true })
    .isFloat({ gt: 0 }),
  check('weight', 'Product weight must be greater than 0')
    .optional()
    .isFloat({ gt: 0 }),
  check('description', 'Product description must be at least 3 characters')
    .optional()
    .isString()
    .isLength({ min: 3 }),
];

const updateProductValidator = [
  check('name', 'Product name must be at least 3 characters')
    .optional()
    .isString()
    .isLength({ min: 3 }),
  check('price', 'Product price must be greater than 0')
    .optional()
    .isFloat({ gt: 0 }),
  check('weight', 'Product weight must be greater than 0')
    .optional()
    .isFloat({ gt: 0 }),
  check('description', 'Product description must be at least 3 characters')
    .optional()
    .isString()
    .isLength({ min: 3 }),
];

module.exports = { createProductValidator, updateProductValidator };
