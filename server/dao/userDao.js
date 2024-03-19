
// dao/usersDao.js
const User = require("../models/userModel"); // Adjust the path to your actual user model

function getUsersListById(userId) {
    // Query the database
    return User.findOne({ id: userId }); // Assuming 'id' is the field you use
}

function getAllUsers() {
    // Query the database
    return User.find();
}

module.exports = {
  getAllUsers,
  getUsersListById,
};
