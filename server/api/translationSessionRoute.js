const express = require('express');
const router = express.Router();
const createAbl = require('../abl/translationSession-abl/create-abl');
const deleteAbl = require('../abl/translationSession-abl/delete-abl');
const getAbl = require('../abl/translationSession-abl/get-abl');
const listAbl = require('../abl/translationSession-abl/list-all-abl');
const updateAbl = require('../abl/translationSession-abl/update-abl');
const listAllAbl = require('../abl/translationSession-abl/list-all-abl');
const verifyToken = require('../middleware/verifyToken'); // Ensure this path is correct
const showMorseCodeAlphabetAbl = require('../abl/translationSession-abl/showMorseCodeAlphabet-abl');
// POST method to add a new translation session
router.post('/', verifyToken, async (req, res) => {
  createAbl(req, res);
});

// GET method to view a translation session by id
router.get('/:id', verifyToken, async (req, res) => {
  getAbl(req, res);
});

// GET method to list all translation sessions
router.get('/list', async (req, res) => {
  listAbl(req, res);
});

// GET method to filter translation sessions by query parameters
router.get('/',verifyToken, async (req, res) => {
  listAllAbl(req, res);
});

// PUT method to rename a translation session
router.put('/:id', verifyToken,async (req, res) => {
  updateAbl(req, res);
});

// GET method to show Morse code alphabet
router.get('/morseAlphabet', verifyToken, async (req, res) => {
  showMorseCodeAlphabetAbl(req, res);
});

// DELETE method to delete a translation session by id
router.delete('/:id',verifyToken, async (req, res) => {
  deleteAbl(req, res);
});

module.exports = router;
