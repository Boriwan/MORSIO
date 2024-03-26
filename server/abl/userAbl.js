const userDao = require('../dao/userDao');

const getAllUsers = async (req, res) => {
  userDao.getAllUsers(res);
};

const getUserById = async (req, res) => {
  userDao.getUserById(req.params.id, res);
};

const addUser = async (req, res) => {
  userDao.addUser(req.body, res);
};

const updateUser = async (req, res) => {
  userDao.updateUser(req.params.id, req.body, res);
};

const deleteUser = async (req, res) => {
  userDao.deleteUser(req.params.id, res);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
