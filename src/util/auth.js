require('dotenv').config();
const jose = require('jose');

const secret = process.env.secret;
const key = new TextEncoder().encode(secret);

const encrypt = async (payload) => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('3 hrs')
    .sign(key);
};

const generateToken = async (id, username, role) => {
  const user = { id, username, role };
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 3);
  const token = await encrypt({ user, expires });

  return token;
};

const decrypt = async (token) => {
  const { payload } = await jose.jwtVerify(token, key, {
    algorithms: ['HS256'],
  });

  return payload;
};

const getBearerToken = async (req) => {
  const header = req.header('Authorization');
  if (!header) return null;
  const [type, token] = header.split(' ');
  if (type !== 'Bearer') return null;
  return token;
};

module.exports = { generateToken, decrypt, getBearerToken };
