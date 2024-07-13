const { Role } = require('@prisma/client');
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
  check('role', 'Role must be either "client" or "merchant"')
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .toUpperCase()
    .trim()
    .isIn([Role.CLIENT, Role.MERCHANT]),
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
