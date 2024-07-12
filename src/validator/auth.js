const { check } = require('express-validator');

const registerValidator = [
  check('username', 'Username must be aleast 6 characters')
    .notEmpty({ ignore_whitespace: true })
    .isLength({ min: 6 })
    .trim(),
  check('password', 'Password must be aleast 6 characters')
    .notEmpty({ ignore_whitespace: true })
    .isLength({ min: 6 })
    .trim(),
];

const loginValidator = [
  check('username', 'Username must be aleast 6 characters')
    .notEmpty({ ignore_whitespace: true })
    .isLength({ min: 6 })
    .trim(),
  check('password', 'Password must be aleast 6 characters')
    .notEmpty({ ignore_whitespace: true })
    .isLength({ min: 6 })
    .trim(),
];

module.exports = { registerValidator, loginValidator };
