// authManager.js

// Initialize the token blacklist as a Set
const tokenBlacklist = new Set();

// Function to add a token to the blacklist
function blacklistToken(token) {
  tokenBlacklist.add(token);
}

// Function to check if a token is blacklisted
function isTokenBlacklisted(token) {
  return tokenBlacklist.has(token);
}

// Export the functionalities
module.exports = { tokenBlacklist, blacklistToken, isTokenBlacklisted };
