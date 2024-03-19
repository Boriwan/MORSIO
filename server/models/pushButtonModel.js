
const mongoose = require('mongoose');

const pushButtonSchema = new mongoose.Schema({
  code: { type: String, required: true }, // uuIdentity of Push Button
  state: { type: String, enum: ['awake', 'asleep'], required: true }, // state of the Push Button
  nameLSI: { type: String, required: true }, // LSI Push Button name
  descLSI: { type: String, required: true }, // LSI Push Button description
  operationList: {
    type: Map,
    of: new mongoose.Schema({
      morseCode: [{ type: String }] // Morse code and time intervals
    }, { _id: false }),
    required: true
  }
});

const PushButton = mongoose.model('PushButton', pushButtonSchema);

module.exports = PushButton;
