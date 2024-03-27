const express = require('express');
const router = express.Router();
const translationSessionAbl = require('../abl/translationSeshionAbl/translationSessionAbl');

// POST method to add a new translation session
router.post('/', async (req, res) => {
  translationSessionAbl.addTranslationSession(req, res);
});

// GET method to view a translation session by id
router.get('/:id', async (req, res) => {
  translationSessionAbl.viewTranslationSession(req, res);
});

// GET method to filter translation sessions by query parameters
router.get('/', async (req, res) => {
  translationSessionAbl.filterTranslationSessions(req, res);
});

// PUT method to rename a translation session
router.put('/:id', async (req, res) => {
  translationSessionAbl.renameTranslationSession(req, res);
});

// GET method to show Morse code alphabet
router.get('/morseAlphabet', async (req, res) => {
  translationSessionAbl.showMorseCodeAlphabet(req, res);
});

module.exports = router;
