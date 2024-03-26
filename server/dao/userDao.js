const User = require('../models/userModel');

const getAllUsers = async (res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserById = async (id, res) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addUser = async (userData, res) => {
  try {
    const user = new User(userData);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (id, userData, res) => {
  try {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (id, res) => {
  try {
    const result = await User.findByIdAndDelete(id);
    if (result) {
      res.status(200).send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
