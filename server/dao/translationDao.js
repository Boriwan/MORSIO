"use strict";
const crypto = require("crypto");
const TranslationModel = require("../models/Translation"); // Adjust the path as necessary

class TranslationDao {
  constructor() {}

  async create(object) {
    object.id = crypto.randomBytes(8).toString("hex");
    const translation = new TranslationModel(object);
    await translation.save();
    return translation;
  }

  async edit(translationId, newData) {
    const updatedTranslation = await TranslationModel.findByIdAndUpdate(translationId, newData, { new: true });
    return updatedTranslation;
  }

  async delete(translationId) {
    await TranslationModel.findOneAndDelete({id: translationId});
  }

  async update(translationId, newData) {
    const updatedTranslation = await TranslationModel.findByIdAndUpdate(translationId, newData, { new: true });
    return updatedTranslation;
  }

  async list() {
    return await TranslationModel.find();
  }

  async get(translationId) {
    return await TranslationModel.findOne({ id: translationId });
  }
}

module.exports = TranslationDao;