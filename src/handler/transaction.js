const { validationResult } = require('express-validator');
const { getInvNumber } = require('../util/inv');
const db = require('../util/db');
const { Type } = require('@prisma/client');

const topup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
  }

  const username = req.username;
  const { amount } = req.body;

  try {
    const invNumber = await getInvNumber(username);
    if (!invNumber) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const updatedBalance = await db.account.update({
      where: { owner: username },
      data: {
        balance: {
          increment: amount,
        },
        Transaction: {
          create: {
            type: Type.TOPUP,
            amount: amount,
            invoice: invNumber,
          },
        },
      },
      select: { balance: true },
    });

    return res
      .status(201)
      .json({ balance: updatedBalance.balance, message: 'Topup Successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to topup: ' + error });
  }
};

module.exports = { topup };
