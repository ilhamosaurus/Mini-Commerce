const db = require('../util/db');

const getUserByUsername = async (username) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true, username: true, password: true },
  });
  if (!user) return null;
  return user;
};

module.exports = { getUserByUsername };
