const express = require('express');
const router = express.Router();
const translationSessionAbl = require('../abl/translationSession-abl/translationSessionAbl');
const createAbl = require('../abl/translationSession-abl/create-abl');
const deleteAbl = require('../abl/translationSession-abl/delete-abl');
const getAbl = require('../abl/translationSession-abl/get-abl');
const listAbl = require('../abl/translationSession-abl/list-all-abl');
const updateAbl = require('../abl/translationSession-abl/update-abl');

// POST method to add a new translation session
router.post('/', async (req, res) => {
  createAbl(req, res);
});

// GET method to view a translation session by id
router.get('/:id', async (req, res) => {
  getAbl(req, res);
});

// GET method to list all translation sessions
router.get('/list', async (req, res) => {
  listAbl(req, res);
});

// GET method to filter translation sessions by query parameters
router.get('/', async (req, res) => {
  translationSessionAbl.filterTranslationSessions(req, res);
});

// PUT method to rename a translation session
router.put('/:id', async (req, res) => {
  updateAbl(req, res);
});

// GET method to show Morse code alphabet
router.get('/morseAlphabet', async (req, res) => {
  translationSessionAbl.showMorseCodeAlphabet(req, res);
});

// DELETE method to delete a translation session by id
router.delete('/:id', async (req, res) => {
  deleteAbl(req, res);
});

module.exports = router;
