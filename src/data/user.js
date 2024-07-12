const db = require('../util/db');

const getUserByUsername = async (username) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true, username: true, password: true },
  });
  if (!user) return null;
  return user;
};

const getUserDetail = async (username) => {
  const user = await db.user.findUnique({
    where: { username },
    include: { Account: true },
  });

  if (!user) return null;

  delete user.password;

  return user;
};

module.exports = { getUserByUsername, getUserDetail };
