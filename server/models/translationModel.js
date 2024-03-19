
const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID of the translation
  sessionId: { type: String, required: true }, // ID of the session
  data: { type: mongoose.Schema.Types.Mixed, required: true } // Translated Morse code
});

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;
