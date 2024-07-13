const { validationResult } = require('express-validator');
const bycrpt = require('bcryptjs');
const db = require('../util/db');
const {
  PrismaClientKnownRequestError,
} = require('@prisma/client/runtime/library');
const { getUserByUsername } = require('../data/user');
const { generateToken } = require('../util/auth');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
  }

  const { username, password, role } = req.body;
  const hashedPassword = await bycrpt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
        Account: {
          create: {
            balance: 0,
          },
        },
      },
    });

    return res
      .status(201)
      .json({ message: 'Registered Successfully, please login.' });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    console.error(error);
    res.status(500).json({ error: `Failed to registered user: ${error}` });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
  }

  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res
        .status(404)
        .json({ error: 'User not found, please register.' });
    }

    const isMatch = await bycrpt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = await generateToken(user.id, user.username, user.role);

    return res.status(200).json({ access_token: token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Failed to authenticate user: ${error}` });
  }
};

module.exports = { register, login };
