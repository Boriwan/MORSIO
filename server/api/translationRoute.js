const express = require('express');
const router = express.Router();
const createAbl = require('../abl/translation-abl/create-abl');
const deleteAbl = require('../abl/translation-abl/delete-abl');
const getAbl = require('../abl/translation-abl/get-abl');
const updateAbl = require('../abl/translation-abl/update-abl');
const listAllAbl = require('../abl/translation-abl/listAll-abl');
const verifyToken = require('../middleware/verifyToken'); // Ensure this path is correct
// POST method to add a new translation session
router.post('/', verifyToken, async (req, res) => {
  createAbl(req, res);
});

// GET method to view a translation session by id
router.get('/:id', verifyToken, async (req, res) => {
  getAbl(req, res);
});


// GET method to filter translation sessions by query parameters
router.get('/listBySession/:sessionId',verifyToken, async (req, res) => {
  listAllAbl(req, res);
});

// PUT method to rename a translation session
router.put('/:id', verifyToken,async (req, res) => {
  updateAbl(req, res);
});

// DELETE method to delete a translation session by id
router.delete('/:id',verifyToken, async (req, res) => {
  deleteAbl(req, res);
});

module.exports = router;
