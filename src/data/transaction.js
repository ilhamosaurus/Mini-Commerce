const db = require('../util/db');

const getProductTransactionHistory = async (kode) => {
  const history = await db.transaction.findMany({
    where: {
      description: {
        contains: kode.toUpperCase(),
      },
    },
  });

  if (!history || history.length === 0) {
    return null;
  }

  return history;
};

module.exports = {
  getProductTransactionHistory,
};
