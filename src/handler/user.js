const { getBalance } = require('../data/accounts');
const { getUserDetail } = require('../data/user');

const getUserInfo = async (req, res) => {
  const username = req.username;

  try {
    const user = await getUserDetail(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    delete user.password;
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to get user balance: ' + error });
  }
};

const getUserBalance = async (req, res) => {
  const username = req.username;
  try {
    const account = await getBalance(username);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    return res.status(200).json(account);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to get user balance: ' + error });
  }
};

module.exports = { getUserBalance, getUserInfo };
