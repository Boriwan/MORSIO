"use strict";
const crypto = require("crypto");
const UserModel = require("../models/UserModel"); // Replace with the correct path to your User model

class UserDao {
  constructor() {}

  async create(object) {
    object.id = crypto.randomBytes(8).toString("hex");
    const user = new UserModel(object);
    await user.save();
    return user;
  }

  async edit(userId, newData) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, {
      new: true,
    });
    return updatedUser;
  }

  async delete(userId) {
    await UserModel.findByIdAndDelete(userId);
  }

  async update(userId, newData) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, {
      new: true,
    });
    return updatedUser;
  }

  async list() {
    return await UserModel.find();
  }

  async get(uuIdentity) {
    return await UserModel.findOne({ uuIdentity });
  }
}

module.exports = UserDao;
