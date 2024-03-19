
const express = require('express');
const router = express.Router();
const Translation = require('../models/translationModel'); // Adjust the path as necessary

// POST method to add a new translation
router.post('/', async (req, res) => {
  try {
    const newTranslation = new Translation(req.body);
    const savedTranslation = await newTranslation.save();
    res.status(201).send(savedTranslation);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
