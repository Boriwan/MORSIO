const crypto = require("crypto");
const TranslationModel = require("../models/translationModel"); // Adjust the path as necessary

class TranslationDao {
  constructor() {}

  async create(object) {
    // Adding a custom 'id' using crypto for unique identifier purposes
    object.id = crypto.randomBytes(8).toString("hex");
    const translationSession = new TranslationModel(object);
    await translationSession.save();
    return translationSession;
  }

  async edit(sessionId, newData) {
    // Assuming 'id' is a unique property managed within the schema outside of MongoDB's '_id'
    const updatedSession = await TranslationModel.findOneAndUpdate({ id: sessionId }, newData, { new: true });
    return updatedSession;
  }

  async delete(sessionId) {
    // Delete based on custom 'id' field, not MongoDB's '_id'
    await TranslationModel.findOneAndDelete({ id: sessionId });
  }

  async update(sessionId, newData) {
    // Same assumption as edit, using the custom 'id'
    const updatedSession = await TranslationModel.findOneAndUpdate({ id: sessionId }, newData, { new: true });
    return updatedSession;
  }

  async list() {
    return await TranslationModel.find();
  }

  async listBySession(sessionId) {
    return await TranslationModel.find({ sessionId: sessionId });
  }
  async deleteBySessionId(sessionId) {
    try {
        // Assuming 'translations' is the collection where translations are stored
        await TranslationModel.deleteMany({ sessionId: sessionId });
        console.log(`Deleted all translations for session ID ${sessionId}`);
    } catch (error) {
        console.error(`Error deleting translations for session ID ${sessionId}:`, error);
        throw error; // Rethrow the error to be handled by the ABL function
    }
}

  async get(sessionId) {
    // Retrieve based on custom 'id'
    return await TranslationModel.findOne({ id: sessionId });
  }


}

module.exports = TranslationDao;
