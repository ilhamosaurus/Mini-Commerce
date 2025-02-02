const db = require('../util/db');

const getBalance = async (username) => {
  const account = await db.account.findUnique({
    where: { owner: username },
    select: { balance: true, owner: true },
  });

  if (!account) return null;

  return {
    owner: account.owner,
    balance: Number(account.balance),
  };
};

const getAccountByUsername = async (username) => {
  const account = await db.account.findUnique({
    where: { owner: username },
    select: { id: true, owner: true, balance: true },
  });

  if (!account) return null;

  return account;
};

module.exports = { getBalance, getAccountByUsername };
