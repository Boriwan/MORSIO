
const mongoose = require('mongoose');

const translationSessionSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID of the session
  name: { type: String, required: true }, // Name of the session
  authorID: { type: String, required: true }, // ID of the session creator
  creationDate: { type: Date, required: true }, // Date when the session was created
  inUse: { type: Boolean, required: true} // Whether the session is in use, only one session has true
});

const TranslationSession = mongoose.model('TranslationSession', translationSessionSchema);

module.exports = TranslationSession;
