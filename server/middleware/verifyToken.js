const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('./authManager'); // Adjust the path as necessary

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(403).json({ error: 'A token is required for authentication' });
  if (isTokenBlacklisted(token)) {
    return res.sendStatus(401); // Unauthorized if token is blacklisted
  }
  jwt.verify(token, 'yourSecretKey', (err, user) => {
    if (err) return res.status(401).json({ error: 'Invalid Token' });
    req.user = user;
    next();
  });
}

module.exports = verifyToken;
