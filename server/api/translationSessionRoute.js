
const express = require('express');
const router = express.Router();
const TranslationSession = require('../models/translationSessionModel'); // Adjust the path as necessary

// POST method to add a new translation session
router.post('/', async (req, res) => {
  try {
    const newTranslationSession = new TranslationSession(req.body);
    const savedTranslationSession = await newTranslationSession.save();
    res.status(201).send(savedTranslationSession);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
