
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String, // Unique identifier for the user
    userName: String, // Name of the user
    email: String, // Email of the user
    password: String // Password of the user
});

const User = mongoose.model('User', userSchema);

module.exports = User;
