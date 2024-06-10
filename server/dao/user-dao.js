"use strict";
const crypto = require("crypto");
const UserModel = require("../models/userModel"); // Adjust the path as necessary

class UserDao {
  constructor() {}

  async create(object) {
    object.id = crypto.randomBytes(8).toString("hex");
    const user = new UserModel(object);
    await user.save();
    return user;
  }

  async edit(userId, newData) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, { new: true });
    return updatedUser;
  }

  async delete(userId) {
    await UserModel.findOneAndDelete({id: userId});
  }

  async update(userId, newData) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, { new: true });
    return updatedUser;
  }

  async list() {
    return await UserModel.find();
  }

  async get(userId) {
    return await UserModel.findOne({ id: userId });
  }

  // Method to find a user by their email address
  async findByEmail(email) {
    return await UserModel.findOne({ email: email });
  }
}

module.exports = UserDao;
