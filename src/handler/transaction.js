const { validationResult } = require('express-validator');
const { getInvNumber } = require('../util/inv');
const db = require('../util/db');
const { Type } = require('@prisma/client');
const { getAccountByUsername } = require('../data/accounts');

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
    const { invNumber } = await getInvNumber(username);
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
            description: invNumber,
          },
        },
      },
      select: { balance: true },
    });

    return res.status(201).json({
      balance: Number(updatedBalance.balance),
      message: 'Topup Successful',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to topup: ' + error });
  }
};

const getHistory = async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || undefined;
  const page = parseInt(req.query.page) || undefined;
  const username = req.username;
  try {
    const account = await getAccountByUsername(username);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    if (pageSize && page) {
      const transactions = await db.transaction.findMany({
        where: {
          account_id: account.id,
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        select: {
          type: true,
          amount: true,
          invoice: true,
          description: true,
        },
      });

      if (!transactions || transactions.length === 0) {
        return res.status(404).send({ message: 'Transactions not found' });
      }
      const data = transactions.map((transaction) => {
        return {
          type: transaction.type,
          amount: Number(transaction.amount),
          invoice: transaction.invoice,
          description: transaction.description,
        };
      });
      return res.status(200).json({
        data,
        total: pageSize > transactions.length ? pageSize : transactions.length,
        currentPage: page,
      });
    }

    const transactions = await db.transaction.findMany({
      where: {
        account_id: account.id,
      },
      select: {
        type: true,
        amount: true,
        invoice: true,
        description: true,
      },
    });
    if (!transactions || transactions.length === 0) {
      return res.status(404).send({ message: 'Transactions not found' });
    }

    const data = transactions.map((transaction) => {
      return {
        type: transaction.type,
        amount: Number(transaction.amount),
        invoice: transaction.invoice,
        description: transaction.description,
      };
    });

    return res
      .status(200)
      .json({ data, total: transactions.length, currentPage: 1 });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to get transactions: ' + error });
  }
};

const payment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
  }
  const username = req.username;
  const { kode_produk, qty } = req.body;
  try {
    const { invNumber, account } = await getInvNumber(username);
    if (!account && !invNumber) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const produk = await db.product.findUnique({
      where: { kode: kode_produk },
      select: { name: true, price: true, weight: true },
    });
    if (!produk) {
      return res.status(404).json({ error: 'Kode produk invalid' });
    }
    //set ongkir to 8000 by default
    const ongkir = 8000;
    // calculate cost
    const cost =
      produk.weight && produk.price < 15000
        ? qty * Number(produk.price) + qty * Number(produk.weight) * ongkir
        : qty * Number(produk.price);
    const sufficientBalance = Number(account.balance) >= cost;
    if (!sufficientBalance) {
      return res
        .status(400)
        .json({ error: 'Balance not sufficient, please topup' });
    }

    // calculate total amount to be paid after discount
    const totalAmount = cost > 50000 ? cost * 0.9 : cost;

    const transaction = await db.$transaction(async (tx) => {
      if (totalAmount === null) {
        throw new Error('Invalid total amount');
      }
      await tx.account.update({
        where: {
          id: account.id,
        },
        data: {
          balance: {
            decrement: totalAmount,
          },
        },
      });

      return tx.transaction.create({
        data: {
          account_id: account.id,
          type: Type.PAYMENT,
          amount: totalAmount,
          invoice: invNumber,
          description: `Payment for ${produk.name} (${qty} pcs) and delivery fee ${ongkir} if your purchase is less than 15000`,
        },
        select: {
          type: true,
          amount: true,
          invoice: true,
          description: true,
        },
      });
    });

    return res.status(200).json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to process payment: ' + error });
  }
};

module.exports = { topup, getHistory, payment };
