const db = require('./db');

const getInvNumber = async (username) => {
  const account = await db.account.findUnique({
    where: {
      owner: username,
    },
    select: {
      id: true,
      owner: true,
      balance: true,
    },
  });
  if (!account) return null;

  const today = new Date();
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate()}T00:00:00Z`;
  const transactionNumber = await db.transaction.count({
    where: {
      account_id: account.id,
      createdAt: {
        gte: date,
      },
    },
  });

  const invDate = today.toJSON().slice(0, 10).split('-').reverse().join('');
  const invNumber = `INV${invDate}-${(transactionNumber + 1)
    .toString()
    .padStart(3, '0')}`;
  return { invNumber, account };
};

module.exports = { getInvNumber };
