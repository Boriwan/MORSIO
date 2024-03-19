
const express = require('express');
const router = express.Router();
const PushButton = require('../models/pushButtonModel'); // Adjust the path as necessary

// POST method to add a new push button
router.post('/', async (req, res) => {
  try {
    const newPushButton = new PushButton(req.body);
    const savedPushButton = await newPushButton.save();
    res.status(201).send(savedPushButton);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
