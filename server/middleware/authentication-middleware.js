const jwt = require("jsonwebtoken");

const { tokenBlacklist } = require("./authManager");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token, unauthorized

  // Check if the token is in the blacklist
  if (tokenBlacklist.has(token)) {
    return res.sendStatus(401); // Token is blacklisted, unauthorized
  }
  jwt.verify(token, "yourSecretKey", (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = decoded; // Add user information to request
    next(); // Proceed to next middleware or route handler
  });
}

module.exports = authenticateToken;
