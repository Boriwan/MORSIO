
const mongoose = require('mongoose');

const translationSessionSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID of the session
  name: { type: String, required: true }, // Name of the session
  authorID: { type: String, required: true }, // ID of the session creator
  creationDate: { type: Date, required: true } // Date when the session was created
});

const TranslationSession = mongoose.model('TranslationSession', translationSessionSchema);

module.exports = TranslationSession;
