"use strict";
const crypto = require("crypto");
const TranslationSessionModel = require("../models/TranslationSessionModel"); // Adjust the path as necessary

class TranslationSessionDao {
  constructor() {}

  async create(object) {
    // Adding a custom 'id' using crypto for unique identifier purposes
    object.id = crypto.randomBytes(8).toString("hex");
    const translationSession = new TranslationSessionModel(object);
    await translationSession.save();
    return translationSession;
  }

  async edit(sessionId, newData) {
    // Assuming 'id' is a unique property managed within the schema outside of MongoDB's '_id'
    const updatedSession = await TranslationSessionModel.findOneAndUpdate({ id: sessionId }, newData, { new: true });
    return updatedSession;
  }
  async listByAuthor(authorId) {
    // Fetch sessions from the database where the authorID matches the logged-in user's ID
    return await this.model.find({ authorID: authorId });
}
  async delete(sessionId) {
    // Delete based on custom 'id' field, not MongoDB's '_id'
    await TranslationSessionModel.findOneAndDelete({ id: sessionId });
  }

  async update(sessionId, newData) {
    // Same assumption as edit, using the custom 'id'
    const updatedSession = await TranslationSessionModel.findOneAndUpdate({ id: sessionId }, newData, { new: true });
    return updatedSession;
  }

  async list() {
    return await TranslationSessionModel.find();
  }

  async listByAuthor(authorId) {
    return await TranslationSessionModel.find({ authorID: authorId });
  }

  async get(sessionId) {
    // Retrieve based on custom 'id'
    return await TranslationSessionModel.findOne({ id: sessionId });
  }


}

module.exports = TranslationSessionDao;
