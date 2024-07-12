const { getBearerToken, decrypt } = require('../util/auth');

const verifyToken = async (req, res, next) => {
  try {
    const token = await getBearerToken(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const payload = await decrypt(token);
    req.userId = payload.user.id;
    req.username = payload.user.username;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to authenticate token: ' + error });
  }
};

module.exports = { verifyToken };
