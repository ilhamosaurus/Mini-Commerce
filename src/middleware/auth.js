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
    req.role = payload.user.role;
    next();
  } catch (error) {
    if (error.code === 'ERR_JWT_EXPIRED') {
      return res.status(401).json({ error: 'Token expired, please login' });
    }
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to authenticate token: ' + error });
  }
};

module.exports = { verifyToken };
