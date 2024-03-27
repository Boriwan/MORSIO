// authManager.js

// Initialize the token blacklist as a Set
const tokenBlacklist = new Set();

// Function to add a token to the blacklist
async function blacklistToken(token) {
  tokenBlacklist.add(token);
}

// Export the token blacklist and the blacklistToken function
module.exports = { tokenBlacklist, blacklistToken };
