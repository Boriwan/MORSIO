
const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID of the translation
  sessionId: { type: String, required: true }, // ID of the session
  morseCode: { type: Array, required: true }, 
  translation: { type: String, required: true},
  creationDate: { type: Date, required: true}
});

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;
